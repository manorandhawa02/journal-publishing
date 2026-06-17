import { Link, useLocation } from "react-router-dom";

function AuthorSidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: "📊",
      path: "/author",
    },
    {
      name: "Submit Paper",
      icon: "📄",
      path: "/author/submit",
    },
    {
      name: "AI Analysis",
      icon: "🤖",
      path: "/ai-analysis",
    },
  ];

  return (
    <div style={sidebarStyle}>
      {/* HEADER */}

      <div>
        <h2 style={logoStyle}>
          Scientific Journal
        </h2>

        <p style={subTitle}>
          Author Workspace
        </p>
      </div>

      {/* NAVIGATION */}

      <div style={menuContainer}>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              ...menuItem,
              ...(location.pathname === item.path
                ? activeMenu
                : {}),
            }}
          >
            <span style={iconStyle}>
              {item.icon}
            </span>

            {item.name}
          </Link>
        ))}
      </div>

      {/* FOOTER CARD */}

      <div style={footerCard}>
        <h4
          style={{
            marginBottom: "10px",
          }}
        >
          Publication Tips
        </h4>

        <p
          style={{
            fontSize: "13px",
            lineHeight: "1.6",
            opacity: 0.9,
          }}
        >
          Complete your manuscript,
          improve AI score and respond
          to reviewer comments quickly
          for faster publication.
        </p>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const sidebarStyle = {
  width: "280px",
  background:
    "linear-gradient(180deg,#0B3C5D,#07253B)",
  color: "white",
  minHeight: "100vh",
  padding: "30px 22px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow:
    "4px 0 20px rgba(0,0,0,0.18)",
};

const logoStyle = {
  margin: 0,
  fontSize: "24px",
  fontWeight: "700",
  letterSpacing: "0.5px",
};

const subTitle = {
  opacity: 0.75,
  marginTop: "8px",
  fontSize: "13px",
};

const menuContainer = {
  marginTop: "40px",
  flex: 1,
};

const menuItem = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "15px 18px",
  borderRadius: "14px",
  textDecoration: "none",
  color: "white",
  marginBottom: "12px",
  transition: "0.3s",
};

const activeMenu = {
  backgroundColor: "rgba(255,255,255,0.12)",
  borderLeft: "4px solid white",
  fontWeight: "600",
};

const iconStyle = {
  fontSize: "18px",
};

const footerCard = {
  background:
    "rgba(255,255,255,0.08)",
  padding: "18px",
  borderRadius: "16px",
  backdropFilter: "blur(10px)",
};

export default AuthorSidebar;