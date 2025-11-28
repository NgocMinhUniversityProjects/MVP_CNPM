import "./index.css"
import wrapper from "../Account_wrapper/index.tsx";

import { useState } from "react";

export type Post = {
  id: number;
  author: string;
  role: string;
  time: string;
  title: string;
  content: string;
  comments: number;
  reported?: boolean;
};

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Tutor Nguyen Van A",
    role: "Tutor",
    time: "2 hours ago",
    title: "Tips for Calculus 1 Midterm Exam",
    content:
      "Hi everyone, I’ve compiled a list of common mistakes and key topics to focus on for the upcoming midterm.",
    comments: 3,
  },
  {
    id: 2,
    author: "Student Tran Thi B",
    role: "Student",
    time: "5 hours ago",
    title: "Looking for Database Study Group",
    content:
      "Is anyone interested in forming a study group for the Database final project?",
    comments: 1,
  },
  {
    id: 3,
    author: "Student Le Van C",
    role: "Student",
    time: "1 day ago",
    title: "[Content Hidden]",
    content: "This post was reported for potential violations and is under review.",
    comments: 0,
    reported: true,
  },
];


function Forum(){
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleSubmit = () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: Post = {
      id: posts.length + 1,
      author: "You",
      role: "Student",
      time: "Just now",
      title: newTitle,
      content: newContent,
      comments: 0,
    };

    setPosts([newPost, ...posts]);
    setNewTitle("");
    setNewContent("");
  };

  return (
    <div className="forum-container">
      <div className="create-post-box">
        <input
          className="title-input"
          placeholder="Post Title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <textarea
          className="content-input"
          placeholder="What's on your mind?"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />

        <button className="post-button" onClick={handleSubmit}>
          Post
        </button>
      </div>

      <h3 className="recent-posts-title">Recent Posts</h3>

      <div className="posts-list">
        {posts.map((post) => (
          <div
            key={post.id}
            className={`post-card ${post.reported ? "reported" : ""}`}
          >
            <div className="post-header">
              <div className="avatar"></div>
              <div>
                <div className="author">{post.author}</div>
                <div className="role-time">
                  {post.role} • {post.time}
                </div>
              </div>
            </div>

            <h4 className="post-title">{post.title}</h4>
            <p className="post-content">{post.content}</p>

            {!post.reported && (
              <button className="comment-btn">
                💬 Comment ({post.comments})
              </button>
            )}

            {post.reported && (
              <div className="reported-admin-box">
                <button className="approve-btn">Approve Post</button>
                <button className="remove-btn">Remove Post</button>
                <button className="ban-btn">Ban User</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Account_forum(){
    return wrapper(<Forum />, 6)
};
