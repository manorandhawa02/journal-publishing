import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewerLayout from "../../layouts/ReviewerLayout";
import { submitReview } from "../../services/paperService";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

function ReviewPaper() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ================= PAPER STATE =================
  const [paper, setPaper] = useState(null);

  // ================= REVIEW FORM =================
  const [review, setReview] = useState({
    score: "",
    comments: "",
    recommendation: "",
  });

  // ================= FETCH PAPER =================
  useEffect(() => {
    fetchPaper();
  }, [id]);

  const fetchPaper = async () => {
    try {
      const res = await API.get(`/paper/${id}`);

      console.log("PAPER DATA:", res.data);
      console.log("FILE URL FRONTEND:", res.data.fileUrl);

      setPaper(res.data);
    } catch (err) {
      console.log("PAPER LOAD ERROR:", err);
    }
  };

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SUBMIT REVIEW =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await submitReview(id, {
        commentsToAuthor: review.comments,
        confidentialComments: "",
        recommendation: review.recommendation,
        rating: review.score,
      });

      alert("Review Submitted Successfully");
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Review submission failed");
    }
  };

  return (
    <ReviewerLayout>
      <h2 style={titleStyle}>Review Paper</h2>

      {/* ================= PAPER DETAILS ================= */}
      {paper && (
        <div style={paperBox}>
          <h3>{paper.title}</h3>

          <p>
            <b>Author:</b> {paper.submittedBy?.name || "Unknown"}
          </p>

          <p>
            <b>Status:</b> {paper.status}
          </p>

          {/* PDF VIEWER */}
          {/* PDF VIEWER */}
          <div style={{ marginTop: "20px" }}>
            <div style={{ marginTop: "20px" }}>
              {paper.fileUrl ? (
                <>
                  <button
                    onClick={() =>
                      window.open(
                        `/pdf-viewer?url=${encodeURIComponent(paper.fileUrl)}`,
                        "_blank",
                      )
                    }
                    style={{
                      padding: "10px 15px",
                      background: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    📄 Open Paper PDF
                  </button>
                </>
              ) : (
                <p style={{ color: "red" }}>PDF not available</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= REVIEW FORM ================= */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroup}>
          <label>Score (1–5)</label>

          <input
            type="number"
            name="score"
            min="1"
            max="5"
            value={review.score}
            onChange={handleChange}
            required
          />
        </div>

        <div style={inputGroup}>
          <label>Comments</label>

          <textarea
            rows="4"
            name="comments"
            value={review.comments}
            onChange={handleChange}
            required
          />
        </div>

        <div style={inputGroup}>
          <label>Recommendation</label>

          <select
            name="recommendation"
            value={review.recommendation}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>

            <option value="Accept">Accept</option>

            <option value="Minor Revision">Minor Revision</option>

            <option value="Major Revision">Major Revision</option>

            <option value="Reject">Reject</option>
          </select>
        </div>

        <button type="submit" style={submitBtn}>
          Submit Review
        </button>
      </form>
    </ReviewerLayout>
  );
}

/* ================= STYLES ================= */

const titleStyle = {
  marginBottom: "30px",
  fontSize: "30px",
  fontWeight: "700",
};

const paperBox = {
  backgroundColor: "white",
  padding: "25px",
  borderRadius: "14px",
  marginBottom: "30px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
};

const pdfBtn = {
  display: "inline-block",
  marginTop: "20px",
  padding: "12px 18px",
  backgroundColor: "#0B3C5D",
  color: "white",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "600",
};

const formStyle = {
  backgroundColor: "white",
  padding: "40px",
  borderRadius: "14px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
  maxWidth: "700px",
};

const inputGroup = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "20px",
};

const submitBtn = {
  padding: "10px 20px",
  backgroundColor: "#0B3C5D",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default ReviewPaper;
