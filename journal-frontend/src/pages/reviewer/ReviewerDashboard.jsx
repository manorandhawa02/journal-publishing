import { useEffect, useState } from "react";
import ReviewerLayout from "../../layouts/ReviewerLayout";
import { getAssignedPapers } from "../../services/reviewService";

function ReviewerDashboard() {
  const [papers, setPapers] = useState([]);

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

  const assignedCount = papers.length;

  const pendingCount = papers.filter(
    (p) =>
      p.status === "Review In Progress" ||
      p.status === "Under Review" ||
      p.status === "Submitted"
  ).length;

  const completedCount = papers.filter(
    (p) =>
      p.status === "Accepted" ||
      p.status === "Rejected" ||
      p.status === "Minor Revision" ||
      p.status === "Major Revision"
  ).length;

  const categories = [
    ...new Set(papers.map((p) => p.journalCategory).filter(Boolean)),
  ];

  return (
    <ReviewerLayout>
      {/* HERO SECTION */}

      <div style={heroCard}>
        <div>
          <h1 style={heroTitle}>Reviewer Workspace</h1>

          <p style={heroText}>
            Manage peer reviews, evaluate manuscript quality, and contribute
            to the journal's editorial excellence.
          </p>
        </div>

        <div style={heroIcon}>📑</div>
      </div>

      {/* STATS */}

      <div style={statsGrid}>
        <StatCard
          title="Assigned Papers"
          value={assignedCount}
          icon="📄"
        />

        <StatCard
          title="Pending Reviews"
          value={pendingCount}
          icon="⏳"
        />

        <StatCard
          title="Completed Reviews"
          value={completedCount}
          icon="✅"
        />
      </div>

      {/* REVIEW PERFORMANCE */}

      <div style={sectionCard}>
        <h2 style={sectionTitle}>Review Activity Overview</h2>

        <div style={activityGrid}>
          <ActivityCard
            title="Current Workload"
            value={`${pendingCount} Active`}
          />

          <ActivityCard
            title="Completed Decisions"
            value={`${completedCount} Reviews`}
          />

          <ActivityCard
            title="Research Areas"
            value={`${categories.length} Categories`}
          />
        </div>
      </div>

      {/* EXPERTISE SECTION */}

      <div style={sectionCard}>
        <h2 style={sectionTitle}>Journal Categories Reviewed</h2>

        {categories.length === 0 ? (
          <p style={{ color: "#666" }}>
            Categories will appear after paper assignments.
          </p>
        ) : (
          <div style={tagContainer}>
            {categories.map((cat, index) => (
              <span key={index} style={tag}>
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* REVIEWER GUIDE */}

      <div style={sectionCard}>
        <h2 style={sectionTitle}>Reviewer Responsibilities</h2>

        <ul style={guideList}>
          <li>Evaluate originality and contribution of submitted work.</li>

          <li>Provide constructive and unbiased feedback.</li>

          <li>Maintain confidentiality throughout review process.</li>

          <li>Recommend acceptance, revision, or rejection.</li>

          <li>Support publication quality and research integrity.</li>
        </ul>
      </div>
    </ReviewerLayout>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, icon }) {
  return (
    <div style={statCard}>
      <div style={statIcon}>{icon}</div>

      <h3>{value}</h3>

      <p>{title}</p>
    </div>
  );
}

function ActivityCard({ title, value }) {
  return (
    <div style={activityCard}>
      <h4>{title}</h4>

      <h2>{value}</h2>
    </div>
  );
}

/* ================= STYLES ================= */

const heroCard = {
  background:
    "linear-gradient(135deg, #0B3C5D 0%, #1F5C89 100%)",
  color: "white",
  padding: "35px",
  borderRadius: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
};

const heroTitle = {
  margin: 0,
  fontSize: "34px",
  fontWeight: "700",
};

const heroText = {
  marginTop: "10px",
  opacity: 0.9,
  maxWidth: "600px",
};

const heroIcon = {
  fontSize: "60px",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
  gap: "20px",
  marginBottom: "30px",
};

const statCard = {
  background: "white",
  borderRadius: "18px",
  padding: "25px",
  textAlign: "center",
  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
};

const statIcon = {
  fontSize: "35px",
  marginBottom: "10px",
};

const sectionCard = {
  background: "white",
  padding: "25px",
  borderRadius: "18px",
  marginBottom: "25px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
};

const sectionTitle = {
  marginBottom: "20px",
  color: "#0B3C5D",
};

const activityGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "20px",
};

const activityCard = {
  background: "#F8FAFC",
  borderRadius: "14px",
  padding: "20px",
  border: "1px solid #E5E7EB",
};

const tagContainer = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const tag = {
  background: "#E8F1F8",
  color: "#0B3C5D",
  padding: "8px 15px",
  borderRadius: "30px",
  fontSize: "14px",
  fontWeight: "600",
};

const guideList = {
  lineHeight: "2",
  color: "#444",
};

export default ReviewerDashboard;