import "./index.css"
import { useState } from "react";

import wrapper from "../Account_wrapper/index.tsx";

const userProfile = {
  //personal settings
  fullName: "Student Name",
  studentId: "2112345",
  email: "user@hcmut.edu.vn",
  phone: "0901234567",
  role: "Student",
  major: "Computer Science",

  
  //security settings
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
  twoFactorEnabled: false,
  twoFactorMethod: "email", // Default method
  

  twoFactorMethods : [
    { value: "email", label: "Authenticate via Email" },
    { value: "otpApp", label: "Authenticate via OTP App" },
  ],
}

function PersonalTab(
  profile : typeof userProfile,
  handleChange : (field: keyof typeof profile, value: string) => void,
  saveProfile : () => void,
){
  return (
      <div className="profile-tab">

        <h3 className="section-title">Profile Information</h3>

        <div className="photo-section">
          <div className="avatar"></div>
          <button className="change-photo-btn">📁 Change Photo</button>
        </div>

        <div className="form-grid">
          <div>
            <label className="field-label" htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              className="input-box"
              value={profile.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
          </div>

          <div>
            <label className="field-label" htmlFor="studentId">Student ID / ID</label>
            <input
              id="studentId"
              className="input-box readonly"
              value={profile.studentId}
              readOnly
            />
          </div>

          <div>
            <label className="field-label" htmlFor="email">Email</label>
            <input
              id="email"
              className="input-box"
              value={profile.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div>
            <label className="field-label" htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              className="input-box"
              value={profile.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
        </div>

        <hr className="divider" />

        <h3 className="section-title">Professional Information</h3>

        <div className="form-grid">
          <div>
            <label className="field-label" htmlFor="role">Role</label>
            <input
              id="role"
              className="input-box readonly"
              value={profile.role}
              readOnly
            />
          </div>

          <div>
            <label className="field-label" htmlFor="major">Major</label>
            <input
              id="major"
              className="input-box"
              value={profile.major}
              onChange={(e) => handleChange("major", e.target.value)}
            />
          </div>
        </div>

        <button className="save-btn" onClick={saveProfile}>
          Save Profile
        </button>
      </div>
    )
}

function SecurityTab(
  profile: typeof userProfile,
  handleChange : (field: keyof typeof profile, value: string | boolean) => void,
  saveProfile: () => void
) {
  return (
    <div className="security-tab">
      <h3 className="section-title">Security Settings</h3>

      {/* Change Password Section */}
      <div className="form-grid">
        <div>
          <label className="field-label" htmlFor="currentPassword">Current Password</label>
          <input
            id="currentPassword"
            className="input-box"
            type="password"
            value={profile.currentPassword}
            onChange={(e) => handleChange("currentPassword", e.target.value)}
          />
        </div>

        <div>
          <label className="field-label" htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            className="input-box"
            type="password"
            value={profile.newPassword}
            onChange={(e) => handleChange("newPassword", e.target.value)}
          />
        </div>

        <div>
          <label className="field-label" htmlFor="confirmNewPassword">Confirm New Password</label>
          <input
            id="confirmNewPassword"
            className="input-box"
            type="password"
            value={profile.confirmNewPassword}
            onChange={(e) => handleChange("confirmNewPassword", e.target.value)}
          />
        </div>
      </div>

      <hr className="divider" />

      {/* Two-Factor Authentication Section */}
      <h4 className="section-title">2-Factor Authentication (2FA)</h4>
      <div>
        <label className="field-label" htmlFor="enable2FA">
          Enable 2FA
        </label>
        <input
          id="enable2FA"
          type="checkbox"
          checked={profile.twoFactorEnabled}
          onChange={(e) => handleChange("twoFactorEnabled", e.target.checked)}
          aria-label="Enable two-factor authentication"
        />
      </div>

      {profile.twoFactorEnabled && (
        <div className="form-grid">
          <div>
            <label className="field-label" htmlFor="twoFactorMethod">Choose your 2FA method</label>
            <select
              id="twoFactorMethod"
              className="input-box"
              value={profile.twoFactorMethod}
              onChange={(e) => handleChange("twoFactorMethod", e.target.value)}
              aria-label="Select two-factor authentication method"
            >
              {profile.twoFactorMethods.map((method) => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <button className="save-btn" onClick={saveProfile}>
        Save Security Settings
      </button>
    </div>
  );
}

function Profile(){
  const [activeTab, setActiveTab] = useState<"personal" | "security">("personal");
  const [profile, setProfile] = useState(userProfile);

  const handleChange = (field: keyof typeof profile, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const saveProfile = () => {
    //Template behavior
    console.log("Saved profile:", profile);
    alert("Profile Saved!");
  };

  return (
    <div className="profile-container">

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === "personal" ? "active" : ""}`}
          onClick={() => setActiveTab("personal")}
        >
          Personal Profile
        </button>

        <button
          className={`tab-btn ${activeTab === "security" ? "active" : ""}`}
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>
      </div>

      {activeTab === "personal" && PersonalTab(profile, handleChange, saveProfile)}
      {activeTab === "security" && SecurityTab(profile, handleChange as any, saveProfile)}
    </div>
  );
};

export default function Account_setting() {
    return wrapper(<Profile />, 8)
};
