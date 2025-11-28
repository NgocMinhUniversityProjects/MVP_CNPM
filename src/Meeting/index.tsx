import "./index.css"

import React, { useState } from "react";

type Participant = {
  id: string;
  name: string;
  role: "host" | "guest";
  isSharingScreen: boolean;
  isMuted: boolean;
};

const participantsData: Participant[] = [
  { id: "1", name: "Tutor Nguyen Van A", role: "host", isSharingScreen: true, isMuted: false },
  { id: "2", name: "Student Tran B", role: "guest", isSharingScreen: false, isMuted: true },
];

export default function MeetingRoom() {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [participants, setParticipants] = useState(participantsData);
  const [currentUser, setCurrentUser] = useState(participantsData[1]);

  const toggleMute = (participantId: string) => {
    setParticipants(
      participants.map((participant) =>
        participant.id === participantId
          ? { ...participant, isMuted: !participant.isMuted }
          : participant
      )
    );
  };

  const toggleVideo = () => {
    // Toggle video on/off logic for the current user
  };

  const toggleScreenShare = () => {
    // Logic to handle screen sharing toggle
  };

  const leaveMeeting = () => {
    console.log("User left the meeting");
    // Implement logic for leaving the meeting
  };

  return (
    <div className="meeting-room">
      <div className="meeting-header">
        <h3>Meeting Room</h3>
        <button className="leave-btn" onClick={leaveMeeting}>
          Leave
        </button>
      </div>

      <div className="sidebar">
        <div className="participants">
          <h4>Participants</h4>
          <ul>
            {participants.map((participant) => (
              <li key={participant.id}>
                {participant.name} ({participant.role})
                {participant.isSharingScreen && <span> (Sharing Screen)</span>}
              </li>
            ))}
          </ul>
        </div>
        <div className="chat-section">
          <button onClick={() => setIsChatVisible(!isChatVisible)}>
            {isChatVisible ? "Hide Chat" : "Show Chat"}
          </button>
          {isChatVisible && (
            <div className="chat-box">
              <p>Chat content here...</p>
            </div>
          )}
        </div>
      </div>

      <div className="video-grid">
        <div className="video-feed">
          <div className="video-tile">
            <h5>{participants[0].name} (Host)</h5>
            {participants[0].isSharingScreen && <div>Screen sharing...</div>}
          </div>
          <div className="video-tile">
            <h5>{currentUser.name} (You)</h5>
            {currentUser.isMuted && <div>Muted</div>}
          </div>
        </div>
      </div>

      <div className="controls">
        <button onClick={() => toggleMute(currentUser.id)}>{currentUser.isMuted ? "Unmute" : "Mute"}</button>
        <button onClick={toggleVideo}>{currentUser.isMuted ? "Turn on Video" : "Turn off Video"}</button>
        <button onClick={toggleScreenShare}>Share Screen</button>
      </div>
    </div>
  );
}
