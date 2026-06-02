import { useState, useContext } from "react";
import { JournalContext } from "../../context/JournalContext";
import AuthorLayout from "../../layouts/AuthorLayout";
import API from "../../services/api";

function SubmitPaper() {
  const { addSubmission } = useContext(JournalContext);

  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    authorName: "",
    keywords: "",
    journalCategory: "Computer Science",
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("abstract", formData.abstract);
      data.append("keywords", formData.keywords);
      data.append("authorName", formData.authorName);
      data.append("journalCategory", formData.journalCategory);

      data.append("file", file);

      const token = localStorage.getItem("token");

      const res = await API.post("/paper/submit", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);

      alert("Paper submitted successfully!");

      setFormData({
        title: "",
        abstract: "",
        authorName: "",
        keywords: "",
        journalCategory: "Computer Science",
      });

      setFile(null);
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Paper upload failed");
    }
  };

  return (
    <AuthorLayout>
      <h2 style={titleStyle}>Submit Research Paper</h2>

      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroup}>
          <label>Paper Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div style={inputGroup}>
          <label>Abstract</label>
          <textarea
            name="abstract"
            rows="4"
            value={formData.abstract}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div style={inputGroup}>
          <label>Keywords</label>

          <input
            type="text"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            placeholder="AI, ML, Blockchain"
          />
        </div>

        <div style={inputGroup}>
          <label>Author Name</label>
          <input
            type="text"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            required
          />
        </div>
        <div style={inputGroup}>
          <label>Journal Category</label>

          <select
            name="journalCategory"
            value={formData.journalCategory}
            onChange={handleChange}
          >
            <option>Artificial Intelligence</option>
            <option>Computer Science</option>
            <option>Software Engineering</option>
            <option>Data Science</option>
            <option>Cyber Security</option>
            <option>Healthcare</option>
            <option>Blockchain</option>
            <option>IoT</option>
            <option>Cloud Computing</option>
          </select>
        </div>
        <div style={inputGroup}>
          <label>Upload PDF</label>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" style={submitBtn}>
          Submit Paper
        </button>
      </form>
    </AuthorLayout>
  );
}

const titleStyle = {
  marginBottom: "30px",
  fontSize: "30px",
  fontWeight: "700",
};

const formStyle = {
  backgroundColor: "white",
  padding: "40px",
  borderRadius: "14px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
  maxWidth: "600px",
};

const inputGroup = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "20px",
};

const submitBtn = {
  padding: "10px 20px",
  backgroundColor: "#0B3C5D",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default SubmitPaper;
