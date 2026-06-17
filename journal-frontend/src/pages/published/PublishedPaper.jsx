import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

function PublishedPaper() {
  const [papers, setPapers] = useState([]);
  const [search, setSearch] = useState("");
  // const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchPublished();
  }, []);

  const fetchPublished = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/published", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPapers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= FILTER LOGIC =================
  const filteredPapers = papers.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <AdminLayout>
      <div style={containerStyle}>
        <h1 style={titleStyle}>📚 Published Journals</h1>

        {/* ================= SEARCH ================= */}
        <input
          type="text"
          placeholder="Search papers by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchStyle}
        />

        {/* ================= FILTER =================
       /* <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          style={selectStyle}
        >
          <option value="">All</option>
          <option value="Published">
            Published
          </option>
        </select>  */}

        {/* ================= CONTENT ================= */}
        {filteredPapers.length === 0 ? (
          <p>No published papers found.</p>
        ) : (
          <div style={gridStyle}>
            {filteredPapers.map((p) => (
              <div key={p._id} style={cardStyle}>
                <h3>{p.title}</h3>

                <p style={metaStyle}>
                  <b>Volume:</b> {p.volume} | <b>Issue:</b> {p.issue}
                </p>

                <p style={metaStyle}>
                  <b>DOI:</b> {p.doi}
                </p>

                <p style={abstractStyle}>
                  {p.abstract?.substring(0, 120)}
                  ...
                </p>

                <button
                  onClick={() =>
                    window.open(
                      `/pdf-viewer?url=${encodeURIComponent(p.fileUrl)}`,
                      "_blank",
                    )
                  }
                  style={btnStyle}
                >
                  📄 Open Paper
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

/* ================= STYLES ================= */

const containerStyle = {
  padding: "20px",
};

const titleStyle = {
  fontSize: "28px",
  marginBottom: "20px",
};

const searchStyle = {
  padding: "10px",
  width: "100%",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const selectStyle = {
  padding: "8px",
  marginBottom: "20px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

const metaStyle = {
  fontSize: "13px",
  color: "#555",
};

const abstractStyle = {
  fontSize: "13px",
  marginTop: "10px",
  flex: "1 1 auto",
};

const btnStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "auto",
  padding: "8px 12px",
  background: "#2563eb",
  color: "white",
  borderRadius: "6px",
  textDecoration: "none",
  width: "fit-content",
};

export default PublishedPaper;
