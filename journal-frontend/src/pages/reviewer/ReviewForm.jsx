import { useState } from "react";
import API from "../../services/api";

function ReviewForm({ paper, refresh }) {
  const [comments, setComments] = useState("");
  const [recommendation, setRecommendation] = useState("Accept");
  const [score, setScore] = useState(5);

  const submitReview = async () => {
    try {
      await API.post(`/review/paper/${paper._id}/submit`, {
        commentsToAuthor: comments,
        recommendation,
        score,
      });

      alert("Review Submitted");
      refresh();
    } catch (err) {
      console.log(err);
      alert("Failed to submit review");
    }
  };

  return (
    <div style={formBox}>
      <h3>Review Paper</h3>

      <h4>{paper.title}</h4>

      <textarea
        placeholder="Comments to author"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        style={input}
      />

      <select
        value={recommendation}
        onChange={(e) => setRecommendation(e.target.value)}
        style={input}
      >
        <option>Accept</option>
        <option>Minor Revision</option>
        <option>Major Revision</option>
        <option>Reject</option>
      </select>

      <input
        type="number"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        style={input}
        min="1"
        max="10"
      />

      <button onClick={submitReview} style={btn}>
        Submit Review
      </button>
    </div>
  );
}

export default ReviewForm;


const container = {
  display: "flex",
  gap: "20px",
};

const leftPanel = {
  width: "40%",
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
};

const rightPanel = {
  width: "60%",
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
};

const card = {
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ddd",
  cursor: "pointer",
};

const formBox = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const input = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const btn = {
  padding: "10px",
  background: "#0B3C5D",
  color: "white",
  border: "none",
  cursor: "pointer",
};

const titleStyle = {
  marginBottom: "20px",
};