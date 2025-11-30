import "./index.css"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

interface SignupChoiceProps {
    imgClass : string
    accountName : string
    onClick?: () => void
}

function SignupChoice(props : SignupChoiceProps){
    return (
        <div className={`choice-container ${props.onClick ? 'clickable' : ''}`} onClick={props.onClick}>
            <div className={"img " + props.imgClass}></div>
            <div className="text">{`Link with your ${props.accountName} account`}</div>
        </div>
    )
}

export default function Signup(){
    const [showHCMUTForm, setShowHCMUTForm] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleContinue = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Store email and password in sessionStorage to use in AskingInfo
        sessionStorage.setItem('signupEmail', email);
        sessionStorage.setItem('signupPassword', password);
        navigate('/moreinfo');
    };

    if (showHCMUTForm) {
        return (
            <div className="signup">
                <div className="box">
                    <div className="title">Create HCMUT Account</div>
                    <form onSubmit={handleContinue} className="signup-form">
                        {error && <div className="error-message">{error}</div>}
                        <input
                            type="email"
                            placeholder="HCMUT Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="signup-input"
                        />
                        <input
                            type="password"
                            placeholder="Password (min 6 characters)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="signup-input"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="signup-input"
                        />
                        <button type="submit" className="signup-button">
                            Continue to Profile Info
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowHCMUTForm(false)}
                            className="back-button"
                        >
                            Back
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="signup">
            <div className="box">
                <div className="title">Make your new account personal!</div>
                <SignupChoice imgClass="hcmut" accountName="HCMUT" onClick={() => setShowHCMUTForm(true)}/>
                <SignupChoice imgClass="google" accountName="Google"/>
                <SignupChoice imgClass="facebook" accountName="Facebook"/>
            </div>
        </div>
    )
}