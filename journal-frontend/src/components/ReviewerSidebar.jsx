import { Link, useLocation } from "react-router-dom";

function ReviewerSidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/reviewer" },
    { name: "Assigned Papers", path: "/reviewer/papers" },
  
  ];

  return (
    <div style={sidebarStyle}>
      <h4 style={logoStyle}>Reviewer Panel</h4>

      <div style={{ marginTop: "40px" }}>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            style={{
              ...linkStyle,
              backgroundColor:
                location.pathname === item.path ? "#EAF3FA" : "transparent",
              fontWeight:
                location.pathname === item.path ? "600" : "400"
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
  width: "250px",
  backgroundColor: "#0B3C5D",
  color: "white",
  minHeight: "100vh",
  padding: "30px 20px",
  display: "flex",
  flexDirection: "column"
};

const logoStyle = {
  fontFamily: "Playfair Display, serif",
  fontWeight: "700"
};

const linkStyle = {
  display: "block",
  padding: "12px 15px",
  borderRadius: "8px",
  textDecoration: "none",
  color: "white",
  marginBottom: "10px"
};

export default ReviewerSidebar;