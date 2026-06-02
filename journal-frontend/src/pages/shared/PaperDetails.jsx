import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { JournalContext } from "../../context/JournalContext";
import ReviewerLayout from "../../layouts/ReviewerLayout";

import {
  makeDecision,
  submitReview,
  submitRevision,
} from "../../services/paperService";



function PaperDetails() {
  const { id } = useParams();

  const { submissions } = useContext(JournalContext);

  const paper = submissions.find((p) => p._id === id);

  // ================= REVIEW STATES =================
  const [comments, setComments] = useState("");
  const [recommendation, setRecommendation] =
    useState("Accept");

  // ================= REVISION STATES =================
  const [revisionComment, setRevisionComment] =
    useState("");

  const [revisionFile, setRevisionFile] =
    useState(null);

  // ================= LOADING =================
  if (!paper) {
    return <div>Loading...</div>;
  }

  // ================= EDITOR DECISION =================
  const handleDecision = async (decision) => {
    try {
      await makeDecision(paper._id, decision);

      alert(`Paper marked as ${decision}`);

      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Error updating decision");
    }
  };

  // ================= SUBMIT REVIEW =================
  const handleSubmitReview = async () => {
    try {
      await submitReview(paper._id, {
        commentsToAuthor: comments,
        recommendation,
      });

      alert("Review submitted successfully");

      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Error submitting review");
    }
  };

  // ================= SUBMIT REVISION =================
  const handleRevisionSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("file", revisionFile);
      formData.append("comment", revisionComment);

      await submitRevision(paper._id, formData);

      alert("Revision submitted successfully");

      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Error submitting revision");
    }
  };

  return (
    <ReviewerLayout>
      <div style={containerStyle}>
        {/* ================= TITLE ================= */}
        <h1>{paper.title}</h1>

        {/* ================= STATUS ================= */}
        <p style={statusStyle}>
          Status: {paper.status}
        </p>

        {/* ================= ABSTRACT ================= */}
        <div style={section}>
          <h3>Abstract</h3>

          <p>{paper.abstract}</p>
        </div>

        {/* ================= FILE ================= */}
        <div style={section}>
          <h3>Download Paper</h3>

          <PDFViewer fileUrl={paper.fileUrl} />
        </div>

        {/* ================= TIMELINE ================= */}
        <div style={section}>
          <h3>Timeline</h3>

          {paper.timeline?.length > 0 ? (
            paper.timeline.map((t, i) => (
              <p key={i}>
                • {t.action} (
                {new Date(t.date).toLocaleString()})
              </p>
            ))
          ) : (
            <p>No timeline available</p>
          )}
        </div>

        {/* ================= EDITOR ACTIONS ================= */}
        <div style={section}>
          <h3>Editorial Actions</h3>

          <button
            onClick={() => handleDecision("Accept")}
            style={btnAccept}
          >
            Accept
          </button>

          <button
            onClick={() =>
              handleDecision("Minor Revision")
            }
            style={btnRevision}
          >
            Minor Revision
          </button>

          <button
            onClick={() =>
              handleDecision("Major Revision")
            }
            style={btnRevision}
          >
            Major Revision
          </button>

          <button
            onClick={() => handleDecision("Reject")}
            style={btnReject}
          >
            Reject
          </button>
        </div>

        {/* ================= REVIEW FORM ================= */}
        <div style={section}>
          <h3>Submit Review</h3>

          <textarea
            placeholder="Write comments to author..."
            value={comments}
            onChange={(e) =>
              setComments(e.target.value)
            }
            style={textarea}
          />

          <select
            value={recommendation}
            onChange={(e) =>
              setRecommendation(e.target.value)
            }
            style={select}
          >
            <option>Accept</option>
            <option>Minor Revision</option>
            <option>Major Revision</option>
            <option>Reject</option>
          </select>

          <button
            onClick={handleSubmitReview}
            style={btnAccept}
          >
            Submit Review
          </button>
        </div>

        {/* ================= REVISION FORM ================= */}
        <div style={section}>
          <h3>Submit Revision</h3>

          <textarea
            placeholder="Explain changes made..."
            value={revisionComment}
            onChange={(e) =>
              setRevisionComment(e.target.value)
            }
            style={textarea}
          />

          <input
            type="file"
            onChange={(e) =>
              setRevisionFile(e.target.files[0])
            }
          />

          <button
            onClick={handleRevisionSubmit}
            style={btnAccept}
          >
            Submit Revision
          </button>
        </div>
      </div>
    </ReviewerLayout>
  );
}

/* ================= STYLES ================= */

const containerStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
};

const section = {
  marginTop: "25px",
};

const statusStyle = {
  fontWeight: "bold",
  color: "#555",
};

const textarea = {
  width: "100%",
  height: "120px",
  marginTop: "10px",
  padding: "10px",
};

const select = {
  marginTop: "10px",
  display: "block",
  padding: "8px",
};

const btnAccept = {
  marginTop: "10px",
  marginRight: "10px",
  background: "green",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

const btnRevision = {
  marginTop: "10px",
  marginRight: "10px",
  background: "orange",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

const btnReject = {
  marginTop: "10px",
  background: "red",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default PaperDetails;