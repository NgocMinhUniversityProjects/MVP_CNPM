// Sessions.js
import wrapper from "../Account_wrapper/index.tsx";
import "./index.css";

import { BsPersonVcardFill } from "react-icons/bs";
import { FaCalendarDay } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";

function Sessions() {
  const upcomingSessions = [
    {
      subject: "Calculus 1",
      tutor: "Nguyen Van A",
      date: "Thursday, Oct 30",
      time: "10:00 - 11:00",
      joinEnabled: true,
      rescheduleEnabled: true,
      cancelEnabled: true,
    },
    {
      subject: "Physics",
      tutor: "Tran Thi B",
      date: "Today, in 15 minutes",
      time: "16:30 - 17:30",
      joinEnabled: true,
      rescheduleEnabled: false,
      cancelEnabled: false,
      warning:
        "This session starts too soon (< 30 mins) and cannot be cancelled or rescheduled.",
    },
  ];

  const pastSessions = [];

  return (
    <div className="sessions-container">
      <h2 className="section-title">Upcoming Sessions</h2>

      {upcomingSessions.map((s, idx) => (
        <div key={idx} className="session-card">
          <div className="session-info">
            <h3 className="subject">{s.subject}</h3>

            <p>
              <BsPersonVcardFill /> <strong>Tutor:</strong> {s.tutor}
            </p>
            <p>
              <FaCalendarDay /> <strong>Date:</strong> {s.date}
            </p>
            <p>
              <FaClock /> <strong>Time:</strong> {s.time}
            </p>

            {s.warning && <p className="warning">{s.warning}</p>}
          </div>

          <div className="session-actions">
            <button className="btn join" disabled={!s.joinEnabled}>
              Join Session
            </button>
            <button className="btn reschedule" disabled={!s.rescheduleEnabled}>
              Reschedule
            </button>
            <button className="btn cancel" disabled={!s.cancelEnabled}>
              Cancel
            </button>
          </div>
        </div>
      ))}

      <h2 className="section-title">Past Sessions</h2>

      {pastSessions.length === 0 && (
        <p className="empty-text">No past sessions</p>
      )}
    </div>
  );
}

export default function Account_session(){
    return wrapper(<Sessions />, 3)
}
