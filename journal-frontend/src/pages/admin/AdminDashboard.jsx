import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getAdminStats } from "../../services/paperService";

function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    submitted: 0,
    screening: 0,
    reviewerAssignment: 0,
    reviewProgress: 0,
    minorRevision: 0,
    majorRevision: 0,
    accepted: 0,
    rejected: 0,
    published: 0,
  });
  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getAdminStats();
      console.log(data.total, data.submitted, data.underReview);
      setStats({
        total: data.total || 0,
        submitted: data.submitted || 0,
        screening: data.screening || 0,
        reviewerAssignment: data.reviewerAssignment || 0,
        reviewProgress: data.reviewProgress || 0,
        minorRevision: data.minorRevision || 0,
        majorRevision: data.majorRevision || 0,
        accepted: data.accepted || 0,
        rejected: data.rejected || 0,
        published: data.published || 0,
      });
    } catch (err) {
      console.log("ADMIN STATS ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <AdminLayout>
      <h2 style={titleStyle}>Editor Dashboard</h2>

      <div style={gridStyle}>
        <StatCard title="Total Papers" value={stats.total} />
        <StatCard title="Submitted" value={stats.submitted} />
        <StatCard title="Initial Screening" value={stats.screening} />
        <StatCard
          title="Reviewer Assignment"
          value={stats.reviewerAssignment}
        />
        <StatCard title="Review In Progress" value={stats.reviewProgress} />
        <StatCard title="Minor Revision" value={stats.minorRevision} />
        <StatCard title="Major Revision" value={stats.majorRevision} />
        <StatCard title="Accepted" value={stats.accepted} />
        <StatCard title="Rejected" value={stats.rejected} />
        <StatCard title="Published" value={stats.published} />
      </div>
      <div style={workflowBox}>
        <h3>Editorial Workflow</h3>

        <div style={workflowStyle}>
          <div>Submitted</div>
          <span>→</span>

          <div>Initial Screening</div>
          <span>→</span>

          <div>Reviewer Assignment</div>
          <span>→</span>

          <div>Review In Progress</div>
          <span>→</span>

          <div>Revision</div>
          <span>→</span>

          <div>Accepted</div>
          <span>→</span>

          <div>Published</div>
        </div>
      </div>
    </AdminLayout>
  );
}

/* ================= COMPONENT ================= */
function StatCard({ title, value }) {
  return (
    <div style={cardStyle}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

/* ================= STYLES ================= */
const titleStyle = {
  marginBottom: "30px",
  fontSize: "32px",
  fontWeight: "700",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "25px",
};

const cardStyle = {
  backgroundColor: "white",
  padding: "25px",
  borderRadius: "14px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
};


//Workflow
const workflowBox = {
  background: "white",
  marginTop: "40px",
  padding: "25px",
  borderRadius: "15px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
};

const workflowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  flexWrap: "wrap",
  marginTop: "20px",
};

export default AdminDashboard;
