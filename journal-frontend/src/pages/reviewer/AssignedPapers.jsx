import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReviewerLayout from "../../layouts/ReviewerLayout";
import { getAssignedPapers } from "../../services/reviewService";

function AssignedPapers() {
  const [papers, setPapers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssignedPapers();
  }, []);

  const fetchAssignedPapers = async () => {
    try {
      const data = await getAssignedPapers();
      setPapers(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ReviewerLayout>
      <h2 style={titleStyle}>Assigned Papers</h2>

      {papers.length === 0 ? (
        <p>No assigned papers.</p>
      ) : (
        papers.map((paper) => (
          <div key={paper._id} style={cardStyle}>
            <h3>{paper.title}</h3>

            <p>
              <b>Author:</b> {paper.submittedBy?.name}
            </p>

            <p>
              <b>Status:</b> {paper.status}
            </p>
            <p>
              <b>Category:</b> {paper.journalCategory}
            </p>

            <p>
              <b>Keywords:</b> {paper.keywords?.join(", ")}
            </p>

            <button
              style={btnStyle}
              onClick={() => navigate(`/reviewer/review/${paper._id}`)}
            >
              Review Paper
            </button>
          </div>
        ))
      )}
    </ReviewerLayout>
  );
}

const titleStyle = {
  marginBottom: "30px",
  fontSize: "32px",
  fontWeight: "700",
};

const cardStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
  marginBottom: "20px",
};

const btnStyle = {
  marginTop: "10px",
  padding: "10px 16px",
  border: "none",
  backgroundColor: "#0B3C5D",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer",
};

export default AssignedPapers;
