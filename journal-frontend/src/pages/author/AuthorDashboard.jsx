import { useEffect, useState } from "react";
import AuthorLayout from "../../layouts/AuthorLayout";
import {
  getAuthorStats,
  getMyPapers,
} from "../../services/paperService";
import { useNavigate } from "react-router-dom";

function AuthorDashboard() {
  const navigate = useNavigate();

  const [papers, setPapers] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState("all");

  const [stats, setStats] = useState({
    total: 0,
    underReview: 0,
    accepted: 0,
    rejected: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const statsData = await getAuthorStats();
      const papersData = await getMyPapers();

      setStats(statsData);
      setPapers(papersData);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredPapers = papers.filter((paper) => {
    if (selectedFilter === "all") return true;

    if (selectedFilter === "underReview")
      return (
        paper.status === "Under Review" ||
        paper.status === "Review In Progress"
      );

    if (selectedFilter === "accepted")
      return paper.status === "Accepted";

    if (selectedFilter === "rejected")
      return paper.status === "Rejected";

    return true;
  });

  return (
    <AuthorLayout>
      <h2 style={titleStyle}>Author Dashboard</h2>

      {/* HERO SECTION */}

      <div style={heroSection}>
        <div>
          <h1 style={{ marginBottom: "10px" }}>
            Welcome Back 👋
          </h1>

          <p style={{ opacity: 0.9 }}>
            Manage submissions, monitor review
            progress and track publication decisions.
          </p>
        </div>
      </div>

      {/* STATS */}

      <div style={gridStyle}>
        <StatCard
          title="Total Papers"
          value={stats.total}
          active={selectedFilter === "all"}
          onClick={() => setSelectedFilter("all")}
        />

        <StatCard
          title="Under Review"
          value={stats.underReview}
          active={selectedFilter === "underReview"}
          onClick={() =>
            setSelectedFilter("underReview")
          }
        />

        <StatCard
          title="Accepted"
          value={stats.accepted}
          active={selectedFilter === "accepted"}
          onClick={() =>
            setSelectedFilter("accepted")
          }
        />

        <StatCard
          title="Rejected"
          value={stats.rejected}
          active={selectedFilter === "rejected"}
          onClick={() =>
            setSelectedFilter("rejected")
          }
        />
      </div>

      {/* PAPERS TABLE */}

      <div style={tableContainer}>
        <div style={tableHeader}>
          <h3>
            {selectedFilter === "all" &&
              "All Submitted Papers"}

            {selectedFilter === "underReview" &&
              "Under Review Papers"}

            {selectedFilter === "accepted" &&
              "Accepted Papers"}

            {selectedFilter === "rejected" &&
              "Rejected Papers"}
          </h3>
        </div>

        {filteredPapers.length === 0 ? (
          <div style={emptyBox}>
            No papers found.
          </div>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredPapers.map((paper) => (
                <tr key={paper._id}>
                  <td style={tdStyle}>
                    {paper.title}
                  </td>

                  <td style={tdStyle}>
                    {paper.journalCategory}
                  </td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        ...statusBadge,
                        backgroundColor:
                          paper.status === "Accepted"
                            ? "#DCFCE7"
                            : paper.status === "Rejected"
                            ? "#FEE2E2"
                            : "#DBEAFE",

                        color:
                          paper.status === "Accepted"
                            ? "#166534"
                            : paper.status === "Rejected"
                            ? "#B91C1C"
                            : "#1E40AF",
                      }}
                    >
                      {paper.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* QUICK ACTIONS */}

      <div style={actionGrid}>
        <div
          style={actionCard}
          onClick={() =>
            navigate("/author/submit")
          }
        >
          <h3>📄 Submit Paper</h3>

          <p>
            Upload a new manuscript for review.
          </p>
        </div>

        <div style={actionCard}>
          <h3>📈 Track Progress</h3>

          <p>
            Monitor editorial decisions and
            review stages.
          </p>
        </div>

        <div
          style={actionCard}
          onClick={() =>
            navigate("/ai-analysis")
          }
        >
          <h3>🤖 AI Analysis</h3>

          <p>
            Analyze manuscript quality using AI.
          </p>
        </div>
      </div>
    </AuthorLayout>
  );
}

/* CARD COMPONENT */

function StatCard({
  title,
  value,
  onClick,
  active,
}) {
  return (
    <div
      onClick={onClick}
      style={{
        ...cardStyle,
        border: active
          ? "2px solid #0B3C5D"
          : "2px solid transparent",
      }}
    >
      <h4>{title}</h4>

      <h1 style={valueStyle}>
        {value}
      </h1>
    </div>
  );
}

/* STYLES */

const titleStyle = {
  marginBottom: "25px",
  fontSize: "32px",
  fontWeight: "700",
};

const heroSection = {
  background:
    "linear-gradient(135deg,#0B3C5D,#1E5F8A)",
  color: "white",
  padding: "35px",
  borderRadius: "20px",
  marginBottom: "30px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "18px",
  cursor: "pointer",
  boxShadow:
    "0 10px 25px rgba(0,0,0,0.08)",
  transition: "0.3s",
};

const valueStyle = {
  marginTop: "10px",
  color: "#0B3C5D",
};

const tableContainer = {
  background: "white",
  marginTop: "35px",
  borderRadius: "20px",
  padding: "25px",
  boxShadow:
    "0 10px 25px rgba(0,0,0,0.08)",
};

const tableHeader = {
  marginBottom: "20px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  textAlign: "left",
  padding: "14px",
  borderBottom: "2px solid #eee",
};

const tdStyle = {
  padding: "16px 14px",
  borderBottom: "1px solid #f2f2f2",
};

const statusBadge = {
  padding: "7px 14px",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "600",
};

const emptyBox = {
  textAlign: "center",
  padding: "40px",
  color: "#777",
};

const actionGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(250px,1fr))",
  gap: "20px",
  marginTop: "35px",
};

const actionCard = {
  background: "white",
  padding: "25px",
  borderRadius: "18px",
  cursor: "pointer",
  boxShadow:
    "0 10px 25px rgba(0,0,0,0.08)",
};

export default AuthorDashboard;