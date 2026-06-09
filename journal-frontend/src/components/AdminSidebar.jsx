import { Link, useLocation } from "react-router-dom";

function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "📊 Dashboard", path: "/admin" },
    { name: "📄 All Submissions", path: "/admin/submissions" },
    // { name: "👨‍⚖️ Assign Reviewers", path: "/admin/assign" },
    { name: "📚 Publish Issues", path: "/admin/issues" },
    { name: "🔍 AI vs Reviewer", path: "/admin/comparison" },
  ];

  return (
    <div style={sidebarStyle}>
      <h4 style={logoStyle}>Scientific Journal</h4>

      <p
        style={{
          fontSize: "13px",
          opacity: 0.7,
          marginBottom: "30px",
        }}
      >
        Editorial Management System
      </p>
      <Link to="/admin/published" style={linkStyle}>
        📚 Published Journals
      </Link>

      <div style={{ marginTop: "40px" }}>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            style={{
              ...linkStyle,
              backgroundColor:
                location.pathname === item.path ? "#EAF3FA" : "transparent",
              fontWeight: location.pathname === item.path ? "600" : "400",
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

const sidebarStyle = {
  width: "270px",
  background: "linear-gradient(180deg,#0B3C5D,#07253B)",
  color: "white",
  minHeight: "100vh",
  padding: "30px 20px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "4px 0 20px rgba(0,0,0,0.15)",
};

const logoStyle = {
  fontSize: "24px",
  fontWeight: "700",
  marginBottom: "8px",
};

const linkStyle = {
  display: "block",
  padding: "14px 18px",
  borderRadius: "12px",
  textDecoration: "none",
  color: "white",
  marginBottom: "10px",
  transition: "0.3s",
};

export default AdminSidebar;
