import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { getPaperById } from "../../services/paperService";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PDFViewer({ fileUrl: propFileUrl }) {
  const [params] = useSearchParams();

  const id = params.get("id"); // paper id (IMPORTANT)

  const [url, setUrl] = useState(propFileUrl || null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(!propFileUrl);
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

    // Otherwise fetch the paper to get the fileUrl
    if (id) {
      fetchPaperUrl();
    } else {
      setError("No paper ID or file URL provided");
      setLoading(false);
    }
  }, [id, propFileUrl]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

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
    <div style={{ textAlign: "center", padding: "10px" }}>
      {/* ================= PDF VIEWER ================= */}
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>

      {/* ================= CONTROLS ================= */}
      <div style={{ marginTop: 10 }}>
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {pageNumber} / {numPages}
        </span>

        <button
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          Next
        </button>
      </div>

      {/* ================= DOWNLOAD ================= */}
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        style={{ display: "block", marginTop: 10 }}
      >
        Download PDF
      </a>
    </div>
  );
}

export default PDFViewer;