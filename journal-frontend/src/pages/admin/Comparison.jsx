import AdminLayout from "../../layouts/AdminLayout";

function Comparison() {
  const aiRecommendation = "Minor Revision";
  const reviewerRecommendation =
    localStorage.getItem("reviewRecommendation") || "Not Submitted";

  const agreement =
    aiRecommendation === reviewerRecommendation;

  return (
    <AdminLayout>
      <h2 style={titleStyle}>AI vs Reviewer Comparison</h2>

      <div style={cardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>AI Recommendation</th>
              <th>Reviewer Recommendation</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{aiRecommendation}</td>
              <td>{reviewerRecommendation}</td>
              <td style={{ fontWeight: "600" }}>
                {agreement ? "Agreement" : "Disagreement"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

const titleStyle = {
  marginBottom: "30px",
  fontSize: "30px",
  fontWeight: "700"
};

const cardStyle = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "14px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.05)"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse"
};

export default Comparison;