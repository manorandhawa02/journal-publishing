import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { getAdminStats } from "../../services/paperService";

function AdminDashboard() {
  const navigate = useNavigate();
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
        <StatCard
          title="Total Papers"
          value={stats.total}
          onClick={() => navigate("/admin/submissions?status=all")}
        />

        <StatCard
          title="Submitted"
          value={stats.submitted}
          onClick={() => navigate("/admin/submissions?status=Submitted")}
        />

        <StatCard
          title="Initial Screening"
          value={stats.screening}
          onClick={() =>
            navigate("/admin/submissions?status=Initial Screening")
          }
        />

        <StatCard
          title="Reviewer Assignment"
          value={stats.reviewerAssignment}
          onClick={() =>
            navigate("/admin/submissions?status=Reviewer Assignment")
          }
        />

        <StatCard
          title="Review In Progress"
          value={stats.reviewProgress}
          onClick={() =>
            navigate("/admin/submissions?status=Review In Progress")
          }
        />

        <StatCard
          title="Minor Revision"
          value={stats.minorRevision}
          onClick={() => navigate("/admin/submissions?status=Minor Revision")}
        />

        <StatCard
          title="Major Revision"
          value={stats.majorRevision}
          onClick={() => navigate("/admin/submissions?status=Major Revision")}
        />

        <StatCard
          title="Accepted"
          value={stats.accepted}
          onClick={() => navigate("/admin/submissions?status=Accepted")}
        />

        <StatCard
          title="Rejected"
          value={stats.rejected}
          onClick={() => navigate("/admin/submissions?status=Rejected")}
        />

        <StatCard
          title="Published"
          value={stats.published}
          onClick={() => navigate("/admin/submissions?status=Published")}
        />
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
function StatCard({ title, value, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "linear-gradient(135deg,#0B3C5D,#1E5F8A)",
        color: "white",
        padding: "25px",
        borderRadius: "18px",
        cursor: "pointer",
        transition: "0.3s",
        boxShadow: "0 10px 25px rgba(11,60,93,0.2)",
      }}
    >
      <h4>{title}</h4>

      <h1>{value}</h1>

      <p>Click to view papers</p>
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
