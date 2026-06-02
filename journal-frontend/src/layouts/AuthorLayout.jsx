import TopNavbar from "../components/TopNavbar";
import AuthorSidebar from "../components/AuthorSidebar";

function AuthorLayout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TopNavbar role="Author" />

      <div style={{ display: "flex" }}>
        <AuthorSidebar />

        <div style={contentStyle}>
          {children}
        </div>
      </div>
    </div>
  );
}

const contentStyle = {
  flex: 1,
  padding: "40px",
  backgroundColor: "#F4F6F9",
  minHeight: "100vh"
};

export default AuthorLayout;