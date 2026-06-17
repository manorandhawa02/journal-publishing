import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPaperById } from "../../services/paperService";

function PDFViewer({ fileUrl: propFileUrl }) {
  const [params] = useSearchParams();

  const id = params.get("id"); // paper id (IMPORTANT)
  const urlParam = params.get("url");

  const [url, setUrl] = useState(propFileUrl || urlParam || null);
  const [loading, setLoading] = useState(!(propFileUrl || urlParam));
  const [error, setError] = useState(null);

  // ================= FETCH PAPER DATA =================
  const fetchPaperUrl = async () => {
    try {
      if (!id) {
        throw new Error("No paper ID provided");
      }

      const paper = await getPaperById(id);

      if (!paper.fileUrl) {
        throw new Error("Paper has no file attached");
      }

      setUrl(paper.fileUrl);
      setError(null);
    } catch (err) {
      console.error("Error fetching paper:", err);
      setError(err.message || "Failed to load PDF");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If fileUrl was passed as prop, use it directly
    if (propFileUrl) {
      setUrl(propFileUrl);
      setLoading(false);
      return;
    }

    if (urlParam) {
      setUrl(urlParam);
      setLoading(false);
      return;
    }

    // Otherwise fetch the paper to get the fileUrl
    if (id) {
      fetchPaperUrl();
    } else {
      setError("No paper ID or file URL provided");
      setLoading(false);
    }
  }, [id, propFileUrl, urlParam]);

  if (loading) {
    return <h3 style={{ textAlign: "center", padding: "20px" }}>Loading PDF...</h3>;
  }

  if (error) {
    return <h3 style={{ textAlign: "center", padding: "20px", color: "red" }}>❌ Error: {error}</h3>;
  }

  if (!url) {
    return <h3 style={{ textAlign: "center", padding: "20px", color: "red" }}>❌ PDF not available</h3>;
  }

  return (
    <div style={{ padding: "16px", background: "#0f172a", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          background: "white",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 18px 50px rgba(15, 23, 42, 0.18)",
        }}
      >
        <div
          style={{
            padding: "14px 18px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            gap: "12px",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div>
            <strong style={{ color: "#0B3C5D" }}>PDF Preview</strong>
            <div style={{ fontSize: "13px", color: "#64748b" }}>
              If the PDF does not render here, use the download link.
            </div>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              background: "#0B3C5D",
              color: "white",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Download PDF
          </a>
        </div>

        <iframe
          src={url}
          title="PDF Viewer"
          style={{ width: "100%", height: "84vh", border: "none", display: "block" }}
        />
      </div>
    </div>
  );
}

export default PDFViewer;