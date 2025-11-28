import "./index.css"
import wrapper from "../Account_wrapper/index.tsx";

import React from "react";

type DocumentItem = {
  id: number;
  title: string;
  description: string;
  uploader: string;
  subject: string;
  fileType: "pdf" | "docx" | "ppt";
};

const documents: DocumentItem[] = [
  {
    id: 1,
    title: "Calculus 1 - Chapter 3 Exercises",
    description: "Practice problems for differentiation and integration.",
    uploader: "Nguyen Van A",
    subject: "Calculus 1",
    fileType: "pdf"
  },
  {
    id: 2,
    title: "Database Design Slides",
    description: "Lecture slides for Week 5 (ERD & Normalization). (Includes quizz materials)",
    uploader: "Tran Thi B",
    subject: "Database",
    fileType: "docx"
  },
  {
    id: 3,
    title: "Physics 2: Midterm Review",
    description: "Summary of all key concepts and formulars for the midterm exam.",
    uploader: "Nguyen Van A",
    subject: "Physics",
    fileType: "ppt"
  }
];

const Documents: React.FC = () => {
  return (
    <div className="doc-container">
      {documents.map((doc) => (
        <div key={doc.id} className="doc-card">
          <div className={`icon icon-${doc.fileType}`} />

          <h3 className="title">{doc.title}</h3>
          <p className="description">{doc.description}</p>

          <div className="meta">
            <span>Uploaded by: {doc.uploader}</span>
            <span>Subject: {doc.subject}</span>
          </div>

          <button className="download-button">Download</button>
        </div>
      ))}
    </div>
  );
};

export default function Account_doc(){
    return wrapper(<Documents />, 5);
}
