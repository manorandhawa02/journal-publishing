import TopNavbar from "../components/TopNavbar";
import ReviewerSidebar from "../components/ReviewerSidebar";

function ReviewerLayout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TopNavbar role="Reviewer" />

      <div style={{ display: "flex" }}>
        <ReviewerSidebar />

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

export default ReviewerLayout;