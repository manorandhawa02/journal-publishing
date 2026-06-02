import { useEffect, useState } from "react";
import API from "../../services/api";
import AdminLayout from "../../layouts/AdminLayout";

function PublishIssues() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await API.get("/issues");

      console.log(res.data);

      setIssues(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminLayout>
      <h2>Published Journal Issues</h2>

      {issues.map((issue) => (
        <div
          key={issue._id}
          style={{
            background: "#fff",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>
            Volume {issue.volume} - Issue {issue.issue}
          </h3>

          <p>Year: {issue.year}</p>

          <h4>Papers</h4>

          {issue.papers?.map((paper) => (
            <div
              key={paper._id}
              style={{
                borderBottom: "1px solid #eee",
                padding: "10px 0",
              }}
            >
              <p>
                <b>{paper.title}</b>
              </p>

              <p>{paper.authors?.join(", ")}</p>

              <p>{paper.doi}</p>
            </div>
          ))}
        </div>
      ))}
    </AdminLayout>
  );
}

export default PublishIssues;