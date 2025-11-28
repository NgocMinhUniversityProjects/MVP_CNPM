import "./index.css"
import wrapper from "../Account_wrapper/index.tsx";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";


type FeedbackEntry = {
  id: number;
  session: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
};

const initialStats = {
  average: 4.7,
  total: 128,
  positivePercentage: 95,
};

const feedbackList: FeedbackEntry[] = [
  {
    id: 1,
    session: "Calculus 1",
    rating: 4.5,
    comment:
      "The tutor was very helpful and explained the concepts clearly. The pace was perfect.",
    author: "Anonymous Student",
    date: "Oct 29, 2025",
  },
  {
    id: 2,
    session: "Database Design",
    rating: 3.5,
    comment:
      "Good session, but we spent too much time on the first topic.",
    author: "Anonymous Student",
    date: "Oct 28, 2025",
  },
];

function Feedback(){
  return (
    <div className="feedback-container">

      <h2 className="feedback-title">⭐ My Feedback</h2>

      <div className="stats-row">
        <div className="stat-item">
          <span className="stat-number">{initialStats.average}</span> / 5
          <div className="stat-label">Average Rating</div>
        </div>
        <div className="stat-item">
          <span className="stat-number">{initialStats.total}</span>
          <div className="stat-label">Total Feedbacks</div>
        </div>
        <div className="stat-item">
          <span className="stat-number">{initialStats.positivePercentage}%</span>
          <div className="stat-label">Positive</div>
        </div>
      </div>

      <h3 className="received-title">Received Feedback</h3>

      {/* List */}
      <div className="feedback-list">
        {feedbackList.map((fb) => (
          <div key={fb.id} className="feedback-card">
            <div className="session-label">Session: {fb.session}</div>

            <div className="rating-row">
              <div className="stars">{renderStars(fb.rating)}</div>
              <span className="rating-number">({fb.rating})</span>
            </div>

            <p className="comment">"{fb.comment}"</p>
            <div className="author">From: {fb.author}</div>

            <div className="date">{fb.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};


// Helper: renders star emojis based on rating
function renderStars(rating: number) {
  const stars = [];
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  for (let i = 0; i < full; i++) {
    stars.push(<FaStar key={"full-" + i} size={20} className="star-icon" />);
  }

  if (half) {
    stars.push(<FaStarHalfAlt key="half" size={20} className="star-icon" />);
  }

  // Optional: fill remaining to always show 5 stars
  while (stars.length < 5) {
    stars.push(
      <FaRegStar key={"empty-" + stars.length} size={20} className="star-icon" />
    );
  }

  return stars;
}

export default function Account_feedback(){
    return wrapper(<Feedback />, 7)
};
