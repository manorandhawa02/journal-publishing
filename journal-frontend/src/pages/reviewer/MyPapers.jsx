import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ReviewerLayout from "../../layouts/ReviewerLayout";

import { getAssignedPapers } from "../../services/reviewService";

function MyPapers() {

  const [papers, setPapers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAssignedPapers();
  }, []);

  const fetchAssignedPapers = async () => {

    try {

      const data = await getAssignedPapers();

      console.log("ASSIGNED PAPERS:", data);

      setPapers(data);

    } catch (err) {

      console.log("ASSIGNED PAPERS ERROR:", err);
    }
  };

  return (
    <ReviewerLayout>

      <h2 style={titleStyle}>
        Assigned Papers
      </h2>

      {papers.length === 0 ? (

        <div style={emptyBox}>
          No assigned papers found.
        </div>

      ) : (

        papers.map((paper) => (

          <div key={paper._id} style={paperCard}>

            <h3>{paper.title}</h3>

            <p>
              <b>Author:</b>{" "}
              {paper.submittedBy?.name || "Unknown"}
            </p>

            <p>
              <b>Status:</b> {paper.status}
            </p>

            <button
              style={reviewBtn}
              onClick={() =>
                navigate(`/reviewer/review/${paper._id}`)
              }
            >
              Review Paper
            </button>

          </div>
        ))
      )}

    </ReviewerLayout>
  );
}

/* ================= STYLES ================= */

const titleStyle = {
  fontSize: "32px",
  fontWeight: "700",
  marginBottom: "30px",
};

const paperCard = {
  backgroundColor: "white",
  padding: "25px",
  borderRadius: "12px",
  marginBottom: "20px",
  boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
};

const reviewBtn = {
  marginTop: "15px",
  padding: "10px 16px",
  backgroundColor: "#0B3C5D",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const emptyBox = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "10px",
};

export default MyPapers;