import { useEffect, useState } from "react";
import AuthorLayout from "../../layouts/AuthorLayout";
import { getAuthorStats } from "../../services/paperService";

function AuthorDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    underReview: 0,
    accepted: 0,
    rejected: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getAuthorStats();
      setStats(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthorLayout>
      <h2 style={titleStyle}>Author Dashboard</h2>

      <div style={gridStyle}>
        <StatCard title="Total Submissions" value={stats.total} />
        <StatCard title="Under Review" value={stats.underReview} />
        <StatCard title="Accepted" value={stats.accepted} />
        <StatCard title="Rejected" value={stats.rejected} />
      </div>
    </AuthorLayout>
  );
}

/* ================= COMPONENT ================= */
function StatCard({ title, value }) {
  return (
    <div style={cardStyle}>
      <h4 style={{ marginBottom: "10px" }}>{title}</h4>
      <h2 style={{ fontWeight: "700" }}>{value}</h2>
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
  padding: "30px",
  borderRadius: "14px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
};

export default AuthorDashboard;