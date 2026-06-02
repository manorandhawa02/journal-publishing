import TopNavbar from "../components/TopNavbar";
import AdminSidebar from "../components/AdminSidebar";

function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TopNavbar role="Admin" />

      <div style={{ display: "flex" }}>
        <AdminSidebar />

        <div style={contentStyle}>
          {children}
        </div>
      </div>
    </div>
  );
}

const contentStyle = {
  flex: 1,
  padding: "35px",
  background: "#F8FAFC",
  minHeight: "100vh",
};
export default AdminLayout;