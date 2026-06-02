import { useState } from "react";
import AuthorLayout from "../layouts/AuthorLayout";

function AIAnalysis() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    if (!file) {
      alert("Please upload a PDF first");
      return;
    }

    // Dummy AI result (Frontend Simulation)
    setResult({
      summary: "This paper discusses AI integration in journal management systems.",
      grammarScore: "85%",
      plagiarism: "12%",
      recommendation: "Minor Revision",
    });
  };

  return (
    <AuthorLayout>
      <h2>AI Paper Analysis</h2>

      <div className="card p-4 shadow mt-4">
        <div className="mb-3">
          <label>Upload Research Paper (PDF)</label>
          <input
            type="file"
            className="form-control"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button className="btn btn-dark" onClick={handleAnalyze}>
          Analyze with AI
        </button>
      </div>

      {result && (
        <div className="mt-4">
          <div className="card p-3 shadow mb-3">
            <h5>AI Summary</h5>
            <p>{result.summary}</p>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="card p-3 shadow">
                <h6>Grammar Score</h6>
                <h3>{result.grammarScore}</h3>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card p-3 shadow">
                <h6>Plagiarism</h6>
                <h3>{result.plagiarism}</h3>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card p-3 shadow">
                <h6>AI Recommendation</h6>
                <h3>{result.recommendation}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </AuthorLayout>
  );
}

export default AIAnalysis;
