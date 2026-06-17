import { useEffect, useState } from "react";
import API from "../../services/api";
import AdminLayout from "../../layouts/AdminLayout";

function PublishIssues() {
  const [issues, setIssues] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [uploadingIssueId, setUploadingIssueId] = useState(null);
  const [uploadFeedback, setUploadFeedback] = useState({});
  const [inputResetTokens, setInputResetTokens] = useState({});

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

  const handleFileChange = (issueId, file) => {
    setSelectedFiles((current) => ({
      ...current,
      [issueId]: file,
    }));

    setUploadFeedback((current) => ({
      ...current,
      [issueId]: null,
    }));
  };

  const resetIssueInput = (issueId) => {
    setInputResetTokens((current) => ({
      ...current,
      [issueId]: (current[issueId] || 0) + 1,
    }));
  };

  const uploadIssuePdf = async (issueId) => {
    const file = selectedFiles[issueId];

    if (!file) {
      setUploadFeedback((current) => ({
        ...current,
        [issueId]: {
          type: "warning",
          message: "Choose a real PDF file before uploading.",
        },
      }));
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadingIssueId(issueId);
      setUploadFeedback((current) => ({
        ...current,
        [issueId]: {
          type: "info",
          message: "Uploading PDF...",
        },
      }));

      await API.put(`/issues/${issueId}/pdf`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSelectedFiles((current) => ({
        ...current,
        [issueId]: null,
      }));

      resetIssueInput(issueId);

      setUploadFeedback((current) => ({
        ...current,
        [issueId]: {
          type: "success",
          message: "Issue PDF uploaded successfully.",
        },
      }));

      await fetchIssues();
    } catch (err) {
      console.log(err);

      const errorMessage =
        err.response?.data?.message || "Failed to upload issue PDF";

      setUploadFeedback((current) => ({
        ...current,
        [issueId]: {
          type: "error",
          message: errorMessage,
        },
      }));

      setSelectedFiles((current) => ({
        ...current,
        [issueId]: null,
      }));

      resetIssueInput(issueId);
    } finally {
      setUploadingIssueId(null);
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

          <p>
            PDF: {issue.pdfUrl ? <a href={issue.pdfUrl} target="_blank" rel="noreferrer">Open current PDF</a> : "No PDF uploaded yet"}
          </p>

          {!issue.pdfUrl && (
            <div
              style={{
                marginTop: "10px",
                padding: "12px 14px",
                borderRadius: "8px",
                background: "#fff7e6",
                color: "#8a5a00",
                fontSize: "14px",
              }}
            >
              No issue PDF is attached yet. Upload a valid PDF to enable the download button on the home page.
            </div>
          )}

          <div style={{ margin: "15px 0" }}>
            <input
              key={`${issue._id}-${inputResetTokens[issue._id] || 0}`}
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileChange(issue._id, e.target.files?.[0] || null)}
            />

            <button
              type="button"
              onClick={() => uploadIssuePdf(issue._id)}
              disabled={uploadingIssueId === issue._id}
              style={{
                marginLeft: "10px",
                padding: "8px 14px",
                border: "none",
                borderRadius: "6px",
                background: "#0B3C5D",
                color: "white",
                cursor: "pointer",
              }}
            >
              {uploadingIssueId === issue._id ? "Uploading..." : "Upload PDF"}
            </button>

            <p style={{ marginTop: "8px", fontSize: "13px", color: "#666" }}>
              Only real PDF files are accepted. Renamed files will be rejected.
            </p>

            {uploadFeedback[issue._id] && (
              <div
                style={{
                  marginTop: "10px",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  background:
                    uploadFeedback[issue._id].type === "success"
                      ? "#e8f7ee"
                      : uploadFeedback[issue._id].type === "error"
                        ? "#fdecec"
                        : uploadFeedback[issue._id].type === "warning"
                          ? "#fff7e6"
                          : "#edf4ff",
                  color:
                    uploadFeedback[issue._id].type === "success"
                      ? "#166534"
                      : uploadFeedback[issue._id].type === "error"
                        ? "#b91c1c"
                        : uploadFeedback[issue._id].type === "warning"
                          ? "#8a5a00"
                          : "#1d4ed8",
                }}
              >
                {uploadFeedback[issue._id].message}
              </div>
            )}
          </div>

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