import { useEffect, useState } from "react";
import API from "../../services/api";
import AdminLayout from "../../layouts/AdminLayout";
import {
  publishPaper,
  getAllPapers,
  assignReviewer,
  acceptPaper,
  rejectPaper,
} from "../../services/paperService";

function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [reviewers, setReviewers] = useState([]);

  useEffect(() => {
    fetchPapers();
    fetchReviewers();
  }, []);

  const fetchPapers = async () => {
    try {
      const res = await API.get("/paper");

      setSubmissions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchReviewers = async () => {
    try {
      const res = await API.get("/admin/reviewers");

      setReviewers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAccept = async (paperId) => {
    try {
      await acceptPaper(paperId);
      alert("Paper accepted");
      fetchPapers();
    } catch (err) {
      console.log(err);
      alert("Accept failed");
    }
  };

  const handleReject = async (paperId) => {
    try {
      const reason = prompt("Enter rejection reason");
      if (!reason) return;

      await rejectPaper(paperId, reason);
      alert("Paper rejected");
      fetchPapers();
    } catch (err) {
      console.log(err);
      alert("Reject failed");
    }
  };
  const handlePublish = async (paperId) => {
    try {
      const res = await publishPaper(paperId);
      console.log("PUBLISH SUCCESS:", res);
      alert("Paper published successfully");
      fetchPapers();
    } catch (err) {
      console.log("PUBLISH ERROR FULL:", err.response);
      alert(err.response?.data?.message || "Publish failed");
    }
  };

  return (
    <AdminLayout>
      <h2 style={titleStyle}>All Submissions</h2>

      <div style={tableContainer}>
        {submissions.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Author</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Reviewer</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {submissions.map((paper) => (
                <tr key={paper._id}>
                  <td style={tdStyle}>{paper.title}</td>
                  <td style={tdStyle}>
                    {paper.submittedBy?.name || "Unknown"}
                  </td>
                  <td style={tdStyle}>{paper.status}</td>
                  <td style={tdStyle}>
                    {paper.assignedReviewers?.length > 0
                      ? paper.assignedReviewers
                          .map((r) => r.name || r)
                          .join(", ")
                      : "Not Assigned"}
                  </td>

                  <td style={tdStyle}>
                    <div style={btnGroup}>
                      <select
                        onChange={async (e) => {
                          const reviewerId = e.target.value;

                          if (!reviewerId) return;

                          try {
                            const res = await API.post(
                              `/review/${paper._id}/assign`,
                              {
                                reviewerId,
                              },
                            );

                            console.log("ASSIGN SUCCESS:", res.data);

                            alert(
                              res.data.message ||
                                "Reviewer Assigned Successfully",
                            );

                            fetchPapers();
                          } catch (err) {
                            console.log("ASSIGN ERROR:", err.response);

                            alert(
                              err.response?.data?.message ||
                                "Assignment Failed",
                            );
                          }
                        }}
                      >
                        <option value="">Select Reviewer</option>

                        {reviewers.map((reviewer) => (
                          <option key={reviewer._id} value={reviewer._id}>
                            {reviewer.name}
                          </option>
                        ))}
                      </select>

                      <button
                        style={assignBtn}
                        onClick={() => handleAccept(paper._id)}
                      >
                        Accept
                      </button>

                      <button
                        style={rejectBtn}
                        onClick={() => handleReject(paper._id)}
                      >
                        Reject
                      </button>
                      <button
                        style={{ marginLeft: 10, padding: '8px 12px' }}
                        onClick={() => window.open(`/pdf-viewer?id=${paper._id}`, '_blank')}
                      >
                        Open
                      </button>
                      {paper.status === "Accepted" && (
                        <button
                          style={{
                            ...assignBtn,
                            marginLeft: "10px",
                            backgroundColor: "green",
                          }}
                          onClick={() => handlePublish(paper._id)}
                        >
                          Publish
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}

/* ================= STYLES ================= */

const titleStyle = {
  marginBottom: "30px",
  fontSize: "30px",
  fontWeight: "700",
};

const tableContainer = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "14px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
  overflowX: "auto",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "left",
};

const thStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #f2f2f2",
};

const btnGroup = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const assignBtn = {
  padding: "6px 14px",
  backgroundColor: "#0B3C5D",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const rejectBtn = {
  ...assignBtn,
  backgroundColor: "crimson",
};

export default Submissions;
