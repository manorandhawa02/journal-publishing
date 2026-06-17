import { useEffect, useState } from "react";
import API from "../../services/api";
import AdminLayout from "../../layouts/AdminLayout";
import { useSearchParams } from "react-router-dom";
import {
  publishPaper,
  getAllPapers,
  assignReviewer,
  acceptPaper,
  rejectPaper,
} from "../../services/paperService";

function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [recommendedReviewers, setRecommendedReviewers] = useState({});
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [reviewers, setReviewers] = useState([]);
  const [searchParams] = useSearchParams();

  const selectedStatus = searchParams.get("status");

  useEffect(() => {
    fetchPapers();
    fetchReviewers();
  }, []);

  const fetchPapers = async () => {
    try {
      const res = await API.get("/paper");
      console.log("PAPERS RESPONSE:", res.data);

      setSubmissions(res.data);
      res.data.forEach((paper) => {
        fetchRecommendedReviewers(paper._id);
      });
    } catch (err) {
      console.log("PAPER ERROR:", err);
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

  const fetchRecommendedReviewers = async (paperId) => {
    try {
      const res = await API.get(`/admin/recommended-reviewers/${paperId}`);

      console.log("RECOMMENDED REVIEWERS", paperId, res.data);

      setRecommendedReviewers((prev) => ({
        ...prev,
        [paperId]: res.data,
      }));
    } catch (err) {
      console.log("RECOMMENDER ERROR:", err);
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

  const filteredSubmissions =
    selectedStatus && selectedStatus !== "all"
      ? submissions.filter((paper) => paper.status === selectedStatus)
      : submissions;

  const submissionCount = filteredSubmissions.length;

  return (
    <AdminLayout>
      <div style={headerRowStyle}>
        <div>
          <h2 style={titleStyle}>
            {selectedStatus && selectedStatus !== "all"
              ? `${selectedStatus} Papers`
              : "All Submissions"}
          </h2>

          <p style={subtitleStyle}>
            Review submissions, assign reviewers, and publish accepted papers.
          </p>
        </div>

        <div style={countPillStyle}>
          {submissionCount} {submissionCount === 1 ? "paper" : "papers"}
        </div>
      </div>

      <div style={tableContainer}>
        {filteredSubmissions.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Author</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Assigned Reviewer</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredSubmissions.map((paper) => (
                <tr key={paper._id} style={rowStyle}>
                  <td style={tdStyle}>{paper.title}</td>
                  <td style={tdStyle}>
                    {paper.submittedBy?.name || "Unknown"}
                  </td>
                  <td style={tdStyle}>
                    <span style={getStatusBadgeStyle(paper.status)}>
                      {paper.status}
                    </span>
                  </td>
                  <td style={tdStyle}>{paper.journalCategory}</td>
                  <td style={tdStyle}>
                    {paper.assignedReviewers?.length > 0
                      ? paper.assignedReviewers
                          .map((r) => r.name || r)
                          .join(", ")
                      : "Not Assigned"}
                  </td>

                  <td style={tdStyle}>
                    <div style={actionStackStyle}>
                      <select
                        style={selectStyle}
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

                            alert(res.data.message);

                            fetchPapers();
                          } catch (err) {
                            alert(
                              err.response?.data?.message ||
                                "Assignment Failed",
                            );
                          }
                        }}
                      >
                        <option value="">Recommended Reviewers</option>

                        {recommendedReviewers[paper._id]
                          ?.filter((item) => item?.reviewer)
                          .map((item) => (
                            <option
                              key={item?.reviewer?._id}
                              value={item?.reviewer?._id}
                            >
                              {item.reviewer.name}
                              {" | "}
                              {item.reviewer.designation}
                              {" | "}
                              Exp: {item.reviewer.experienceYears} yrs
                              {" | "}
                              Reviews: {item.reviewer.reviewsCompleted}
                            </option>
                          ))}
                      </select>

                        <div style={btnGroup}>
                          <button
                            type="button"
                            style={acceptBtn}
                            onClick={() => handleAccept(paper._id)}
                          >
                            Accept
                          </button>

                          <button
                            type="button"
                            style={rejectBtn}
                            onClick={() => handleReject(paper._id)}
                          >
                            Reject
                          </button>

                          {paper.status === "Accepted" && (
                            <button
                              type="button"
                              style={publishBtn}
                              onClick={() => handlePublish(paper._id)}
                            >
                              Publish
                            </button>
                          )}
                        </div>
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

const subtitleStyle = {
  marginTop: "6px",
  color: "#64748b",
  fontSize: "14px",
};

const headerRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "20px",
  marginBottom: "18px",
  flexWrap: "wrap",
};

const countPillStyle = {
  background: "#e2e8f0",
  color: "#0f172a",
  padding: "10px 14px",
  borderRadius: "999px",
  fontWeight: "600",
  fontSize: "14px",
};

const tableContainer = {
  backgroundColor: "white",
  padding: "22px",
  borderRadius: "18px",
  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
  overflowX: "auto",
  border: "1px solid #e5e7eb",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "left",
};

const thStyle = {
  padding: "12px",
  borderBottom: "1px solid #dbe3ee",
  color: "#334155",
  fontSize: "13px",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #eef2f7",
  verticalAlign: "top",
};

const btnGroup = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  alignItems: "center",
};

const actionStackStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  minWidth: "280px",
};

const selectStyle = {
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  backgroundColor: "#fff",
  color: "#0f172a",
  fontSize: "14px",
  width: "100%",
};

const acceptBtn = {
  padding: "8px 14px",
  backgroundColor: "#0B3C5D",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const rejectBtn = {
  padding: "8px 14px",
  backgroundColor: "crimson",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const publishBtn = {
  padding: "8px 14px",
  backgroundColor: "green",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const rowStyle = {
  transition: "background-color 0.2s ease",
};

function getStatusBadgeStyle(status) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "700",
    whiteSpace: "nowrap",
  };

  switch (status) {
    case "Accepted":
      return {
        ...base,
        backgroundColor: "#dcfce7",
        color: "#166534",
      };
    case "Rejected":
      return {
        ...base,
        backgroundColor: "#fee2e2",
        color: "#b91c1c",
      };
    case "Published":
      return {
        ...base,
        backgroundColor: "#dbeafe",
        color: "#1d4ed8",
      };
    default:
      return {
        ...base,
        backgroundColor: "#e2e8f0",
        color: "#334155",
      };
  }
};

export default Submissions;
