import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [publications, setPublications] = useState([]);

  // ================= FETCH PUBLICATIONS =================
  const fetchPublications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/published"
      );

      console.log("PUBLISHED:", res.data);

      setPublications(res.data);

    } catch (err) {

      console.log("PUBLICATION ERROR:", err);

    }
  };

  // ================= EFFECT =================
  useEffect(() => {

    fetchPublications();

    const sections = document.querySelectorAll(".fade-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }

        });
      },
      {
        threshold: 0.2,
      }
    );

    sections.forEach((section) =>
      observer.observe(section)
    );

    return () => observer.disconnect();

  }, []);

  return (
    <div>

      {/* ================= HERO ================= */}
      <section style={heroStyle}>

        <h1 style={heroTitle}>
          Scientific Journal Platform
        </h1>

        <p style={heroText}>
          A modern manuscript submission and peer-review
          system designed for transparent, ethical, and
          efficient academic publishing workflows.
        </p>

        <div style={heroBtnContainer}>

          <Link to="/signup">
            <button style={primaryBtn}>
              Get Started
            </button>
          </Link>

          <Link to="/login">
            <button style={secondaryBtn}>
              Login
            </button>
          </Link>

        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        className="fade-section"
        style={sectionLight}
      >
        <h2 style={sectionTitle}>
          About Our Platform
        </h2>

        <p style={sectionText}>
          Our platform streamlines manuscript submission,
          reviewer assignment, editorial workflows,
          publication management, and journal archiving
          for modern academic publishing.
        </p>
      </section>

      {/* ================= FEATURES ================= */}
      <section
        className="fade-section"
        style={sectionDark}
      >
        <h2 style={sectionTitleWhite}>
          Core Features
        </h2>

        <div style={featuresContainer}>

          <FeatureCard
            title="Manuscript Submission"
            text="Authors submit papers with metadata, DOI support, categories, and publication tracking."
          />

          <FeatureCard
            title="Peer Review Workflow"
            text="Editors assign reviewers while reviewers submit comments, recommendations, and evaluations."
          />

          <FeatureCard
            title="Publication Management"
            text="Accepted papers are published into journal volumes and issues professionally."
          />

        </div>
      </section>

      {/* ================= STATS ================= */}
      <section
        className="fade-section"
        style={sectionLight}
      >
        <h2 style={sectionTitle}>
          Platform Statistics
        </h2>

        <div style={statsContainer}>

          <StatBox
            target={250}
            label="Submissions"
            suffix="+"
          />

          <StatBox
            target={120}
            label="Active Reviewers"
            suffix="+"
          />

          <StatBox
            target={85}
            label="Acceptance Rate"
            suffix="%"
          />

          <StatBox
            target={30}
            label="Avg Review Time"
            suffix=" Days"
          />

        </div>
      </section>

      {/* ================= LATEST PUBLICATIONS ================= */}
      <section
        className="fade-section"
        style={sectionLight}
      >

        <h2 style={sectionTitle}>
          Latest Publications
        </h2>

        {publications.length === 0 ? (

          <p
            style={{
              marginTop: "40px",
              fontSize: "18px",
              color: "#666",
            }}
          >
            No published papers available yet.
          </p>

        ) : (

          <div style={publicationContainer}>

            {publications.map((paper) => (

              <PublicationCard
                key={paper._id}
                paper={paper}
              />

            ))}

          </div>

        )}
      </section>

      {/* ================= LATEST ISSUE ================= */}
      <section
        className="fade-section"
        style={latestIssueSection}
      >

        <h2 style={sectionTitleWhite}>
          Current Issue
        </h2>

        <div style={issueCard}>

          <h3>
            Volume 12 • Issue 1
          </h3>

          <p style={{ marginTop: "15px" }}>
            January 2026 Special Issue on
            Artificial Intelligence &
            Digital Publishing Systems.
          </p>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer style={footerStyle}>
        © 2026 Scientific Journal Platform |
        All Rights Reserved
      </footer>

    </div>
  );
}

/* ================= FEATURE CARD ================= */
function FeatureCard({ title, text }) {

  return (
    <div style={featureCard}>

      <h4 style={{ marginBottom: "15px" }}>
        {title}
      </h4>

      <p style={{ fontSize: "14px" }}>
        {text}
      </p>

    </div>
  );
}

/* ================= PUBLICATION CARD ================= */
function PublicationCard({ paper }) {

  return (
    <div style={publicationCard}>

      <h3 style={paperTitle}>
        {paper.title}
      </h3>

      <p style={metaStyle}>
        {paper.authors?.join(", ")}
      </p>

      <p style={metaStyle}>
        Volume {paper.volume} | Issue {paper.issue}
      </p>

      <p style={doiStyle}>
        DOI: {paper.doi}
      </p>

      <p style={abstractStyle}>
        {paper.abstract?.substring(0, 180)}...
      </p>

      <a
        href={paper.fileUrl}
        target="_blank"
        rel="noreferrer"
        style={viewBtn}
      >
        View Article
      </a>

    </div>
  );
}

/* ================= STAT BOX ================= */
function StatBox({
  target,
  label,
  suffix = "",
}) {

  const [count, setCount] = useState(0);

  useEffect(() => {

    let start = 0;

    const duration = 2000;

    const increment =
      target / (duration / 16);

    const counter = setInterval(() => {

      start += increment;

      if (start >= target) {

        setCount(target);

        clearInterval(counter);

      } else {

        setCount(Math.floor(start));

      }

    }, 16);

    return () => clearInterval(counter);

  }, [target]);

  return (
    <div style={statBox}>

      <h3 style={statNumber}>
        {count}
        {suffix}
      </h3>

      <p style={statLabel}>
        {label}
      </p>

    </div>
  );
}

/* ================= STYLES ================= */

const heroStyle = {
  minHeight: "92vh",
  background:
    "linear-gradient(135deg, #0B3C5D, #328CC1)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "40px",
};

const heroTitle = {
  fontSize: "60px",
  fontWeight: "700",
  marginBottom: "25px",
  letterSpacing: "-1px",
};

const heroText = {
  maxWidth: "800px",
  fontSize: "18px",
  lineHeight: "1.9",
  marginBottom: "40px",
};

const heroBtnContainer = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
};

const sectionLight = {
  padding: "100px 20px",
  textAlign: "center",
};

const sectionDark = {
  padding: "100px 20px",
  backgroundColor: "#0B3C5D",
  color: "white",
  textAlign: "center",
};

const sectionTitle = {
  fontSize: "42px",
  marginBottom: "25px",
  fontWeight: "700",
  color: "#0B3C5D",
};

const sectionTitleWhite = {
  fontSize: "42px",
  marginBottom: "35px",
  fontWeight: "700",
  color: "white",
};

const sectionText = {
  maxWidth: "850px",
  margin: "0 auto",
  fontSize: "17px",
  lineHeight: "1.9",
  color: "#444",
};

const featuresContainer = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "35px",
  maxWidth: "1150px",
  margin: "0 auto",
};

const featureCard = {
  backgroundColor: "white",
  color: "#0B3C5D",
  padding: "35px",
  borderRadius: "18px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.10)",
};

const statsContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "35px",
  flexWrap: "wrap",
  marginTop: "40px",
};

const statBox = {
  backgroundColor: "white",
  padding: "40px",
  borderRadius: "18px",
  width: "230px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};

const statNumber = {
  fontSize: "40px",
  fontWeight: "700",
  color: "#0B3C5D",
};

const statLabel = {
  marginTop: "10px",
  fontSize: "15px",
};

const publicationContainer = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "30px",
  maxWidth: "1200px",
  margin: "50px auto 0 auto",
};

const publicationCard = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "18px",
  textAlign: "left",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};

const paperTitle = {
  marginBottom: "15px",
  fontWeight: "700",
  color: "#0B3C5D",
};

const metaStyle = {
  fontSize: "14px",
  color: "#666",
  marginBottom: "8px",
};

const doiStyle = {
  fontSize: "13px",
  color: "#0B3C5D",
  fontWeight: "600",
  marginBottom: "15px",
};

const abstractStyle = {
  fontSize: "14px",
  lineHeight: "1.8",
  color: "#333",
  marginBottom: "25px",
};

const latestIssueSection = {
  padding: "100px 20px",
  background:
    "linear-gradient(135deg, #0B3C5D, #164B75)",
  textAlign: "center",
};

const issueCard = {
  backgroundColor: "white",
  maxWidth: "700px",
  margin: "0 auto",
  padding: "40px",
  borderRadius: "20px",
  color: "#0B3C5D",
  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
};

const primaryBtn = {
  padding: "14px 34px",
  backgroundColor: "white",
  color: "#0B3C5D",
  border: "none",
  borderRadius: "30px",
  fontWeight: "700",
  cursor: "pointer",
  fontSize: "15px",
};

const secondaryBtn = {
  padding: "14px 34px",
  backgroundColor: "transparent",
  color: "white",
  border: "2px solid white",
  borderRadius: "30px",
  fontWeight: "700",
  cursor: "pointer",
  fontSize: "15px",
};

const viewBtn = {
  display: "inline-block",
  padding: "10px 18px",
  backgroundColor: "#0B3C5D",
  color: "white",
  borderRadius: "30px",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "600",
};

const footerStyle = {
  backgroundColor: "#0B3C5D",
  color: "white",
  textAlign: "center",
  padding: "25px",
};

export default Home;