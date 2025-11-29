import "./index.css"
import wrapper from "../Account_wrapper/index.tsx"

import { FaBook, FaClock } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa6";


import { useState } from "react";

// Hard coded data
const tutors = [
    {
        id: 1,
        name: "Nguyen Van A",
        type: "Group",
        subject: "Calculus 1",
        date: "2025-10-30",
        dateLabel: "Thursday, Oct 30",
        time: "10:00 - 11:00",
    },
    {
        id: 2,
        name: "Tran Thi B",
        type: "Individual",
        subject: "Database",
        date: "2025-10-31",
        dateLabel: "Friday, Oct 31",
        time: "14:00 - 15:00",
    },
];

function Tutor() {
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [tutorFilter, setTutorFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  

  const filteredTutors = tutors.filter((t) => {
    return (
      (subjectFilter === "All" || t.subject === subjectFilter) &&
      (tutorFilter === "All" || t.name === tutorFilter) &&
      (!dateFilter || t.date === dateFilter)
    );
  });

  return (
    <div className="container">
        <div className="filterPanel">
            <h4>Filter Tutors</h4>

            <label htmlFor="subjectFilter">By Subject</label>
            <select
                id="subjectFilter"
                className="input"
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                aria-label="Filter by subject"
            >
                <option>All</option>
                <option>Calculus 1</option>
                <option>Database</option>
            </select>

            <label htmlFor="tutorFilter">By Tutor</label>
            <select
                id="tutorFilter"
                className="input"
                value={tutorFilter}
                onChange={(e) => setTutorFilter(e.target.value)}
                aria-label="Filter by tutor"
            >
                <option>All</option>
                <option>Nguyen Van A</option>
                <option>Tran Thi B</option>
            </select>

            <label htmlFor="dateFilter">By Date</label>
            <input
                id="dateFilter"
                className="input"
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                aria-label="Filter by date"
            />
        </div>

      
    <div className="listPanel">
        <h2>Available Time Slots</h2>

        {filteredTutors.map((t) => (
          <div key={t.id} className="card">
            <div className="avatar" />

            <div className="card-content">
              <strong>{t.name}</strong>
              <div className={`type-badge ${t.type.toLowerCase()}`}>
                {t.type}
              </div>

              <div className="card-details">
                <p><FaBook        /><b>Subject:</b> {t.subject}</p>
                <p><FaCalendarDay /><b>Date:</b> {t.dateLabel}</p>
                <p><FaClock       /><b>Time:</b> {t.time}</p>
              </div>
            </div>

            <button className="call-to-action">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Account_book(){
    return wrapper(<Tutor />, 2)
}
