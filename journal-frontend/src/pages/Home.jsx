import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const publicationsSectionRef = useRef(null);
  const [publications, setPublications] = useState([]);
  const [latestIssue, setLatestIssue] = useState(null);

  // ================= FETCH PUBLICATIONS =================
  const fetchPublications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/published");

      console.log("PUBLISHED:", res.data);

      setPublications(res.data);
    } catch (err) {
      console.log("PUBLICATION ERROR:", err);
    }
  };

  // ================= FETCH ISSUES =================
  const fetchIssues = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/issues");

      const currentIssue = res.data?.[0] || null;

      setLatestIssue(currentIssue);
    } catch (err) {
      console.log("ISSUE ERROR:", err);
    }
  };

  const handleDownloadIssue = () => {
    if (latestIssue?.pdfUrl) {
      window.open(latestIssue.pdfUrl, "_blank", "noopener,noreferrer");
      return;
    }

    navigate("/admin/issues");
  };

  // ================= EFFECT =================
  useEffect(() => {
    fetchPublications();
    fetchIssues();

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
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* ================= HERO ================= */}
      <section style={heroStyle}>
        <div
          style={{
            maxWidth: "1200px",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: "50px",
            alignItems: "center",
          }}
        >
          <div>
            <h1 style={heroTitle}>
              Advancing Research Through
              <br />
              Transparent Peer Review
            </h1>

            <p style={heroText}>
              A modern scientific publishing platform enabling manuscript
              submission, reviewer collaboration, editorial workflows and
              professional journal publication.
            </p>

            <div style={heroBtnContainer}>
              <Link to="/signup">
                <button style={primaryBtn}>Submit Research</button>
              </Link>

              <Link to="/login">
                <button style={secondaryBtn}>Login</button>
              </Link>
            </div>
          </div>

          <div style={heroStatsCard}>
            <div style={metricRow}>
              <h2>250+</h2>
              <p>Published Papers</p>
            </div>

            <div style={metricRow}>
              <h2>120+</h2>
              <p>Reviewers</p>
            </div>

            <div style={metricRow}>
              <h2>30+</h2>
              <p>Institutions</p>
            </div>

            <div style={metricRow}>
              <h2>85%</h2>
              <p>Acceptance Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="fade-section" style={sectionLight}>
        <h2 style={sectionTitle}>About Our Platform</h2>

        <p style={sectionText}>
          Our platform streamlines manuscript submission, reviewer assignment,
          editorial workflows, publication management, and journal archiving for
          modern academic publishing.
        </p>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="fade-section" style={sectionDark}>
        <h2 style={sectionTitleWhite}>Core Features</h2>

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

      <section style={sectionLight}>
        <h2 style={sectionTitle}>Why Publish With Us</h2>

        <div style={featuresContainer}>
          <FeatureCard
            title="Fast Review"
            text="Accelerated peer review process."
          />

          <FeatureCard
            title="DOI Support"
            text="Permanent identifiers for publications."
          />

          <FeatureCard
            title="Research Visibility"
            text="Global accessibility and discoverability."
          />

          <FeatureCard
            title="Ethical Publishing"
            text="Transparent editorial workflows."
          />
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="fade-section" style={sectionLight}>
        <h2 style={sectionTitle}>Platform Statistics</h2>

        <div style={statsContainer}>
          <StatBox target={250} label="Submissions" suffix="+" />

          <StatBox target={120} label="Active Reviewers" suffix="+" />

          <StatBox target={85} label="Acceptance Rate" suffix="%" />

          <StatBox target={30} label="Avg Review Time" suffix=" Days" />
        </div>
      </section>

      {/* ================= LATEST PUBLICATIONS ================= */}
      <section className="fade-section" style={sectionLight}>
        <h2 style={sectionTitle}>Latest Publications</h2>

        <div ref={publicationsSectionRef} />

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
              <PublicationCard key={paper._id} paper={paper} />
            ))}
          </div>
        )}
      </section>

      {/* ================= LATEST ISSUE ================= */}
      <section className="fade-section" style={latestIssueSection}>
        <h2 style={sectionTitleWhite}>Current Issue</h2>

        <div style={issueCard}>
          <h3>
            Volume {latestIssue?.volume ?? 12} • Issue {latestIssue?.issue ?? 1}
          </h3>

          <p style={{ marginTop: "15px" }}>
            {latestIssue
              ? `Latest issue for ${latestIssue.year || new Date().getFullYear()} with ${latestIssue.papers?.length || 0} published papers.`
              : "January 2026 Special Issue on Artificial Intelligence and Digital Publishing Systems."}
          </p>

          <div
            style={{
              marginTop: "25px",
              display: "flex",
              gap: "15px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() =>
                publicationsSectionRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              style={primaryBtn}
            >
              Browse Articles
            </button>

            <button
              type="button"
              onClick={handleDownloadIssue}
              style={secondaryDarkBtn}
            >
              Download Issue
            </button>
          </div>
        </div>
      </section>

      <section
        style={{
          background: "linear-gradient(135deg,#0B3C5D,#328CC1)",
          padding: "80px 20px",
          textAlign: "center",
          color: "white",
        }}
      >
        <h2
          style={{
            fontSize: "42px",
            marginBottom: "20px",
          }}
        >
          Ready To Publish Your Research?
        </h2>

        <p
          style={{
            maxWidth: "700px",
            margin: "0 auto 30px",
          }}
        >
          Join authors, reviewers and editors using our scientific publishing
          platform.
        </p>

        <Link to="/signup">
          <button style={primaryBtn}>Create Account</button>
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      <footer style={footerStyle}>
        © 2026 Scientific Journal Platform | All Rights Reserved
      </footer>
    </div>
  );
}

/* ================= FEATURE CARD ================= */
function FeatureCard({ title, text }) {
  return (
    <div style={featureCard}>
      <h4 style={{ marginBottom: "15px" }}>{title}</h4>

      <p style={{ fontSize: "14px" }}>{text}</p>
    </div>
  );
}

/* ================= PUBLICATION CARD ================= */
function PublicationCard({ paper }) {
  return (
    <div style={publicationCard}>
      <span
        style={{
          background: "#EAF3FA",
          color: "#0B3C5D",
          padding: "6px 12px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "600",
          display: "inline-block",
          marginBottom: "15px",
        }}
      >
        {paper.journalCategory || "Research"}
      </span>

      <h3 style={paperTitle}>{paper.title}</h3>

      <p style={metaStyle}>{paper.authors?.join(", ")}</p>

      <p style={metaStyle}>
        Volume {paper.volume} | Issue {paper.issue}
      </p>

      <p style={doiStyle}>DOI: {paper.doi}</p>

      <p style={abstractStyle}>{paper.abstract?.substring(0, 180)}...</p>

      <a
        href={`/pdf-viewer?url=${encodeURIComponent(paper.fileUrl)}`}
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
function StatBox({ target, label, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const duration = 2000;

    const increment = target / (duration / 16);

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

      <p style={statLabel}>{label}</p>
    </div>
  );
}

/* ================= STYLES ================= */

const heroStyle = {
  minHeight: "92vh",
  background: "linear-gradient(135deg, #0B3C5D, #328CC1)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "40px",
};

const heroTitle = {
  fontSize: "72px",
  lineHeight: "1.1",
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
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "30px",
  maxWidth: "1200px",
  margin: "50px auto 0 auto",
  alignItems: "stretch",
};

const publicationCard = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "20px",
  textAlign: "left",
  boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
  transition: "0.3s",
  border: "1px solid #eef2f7",
  display: "flex",
  flexDirection: "column",
  height: "100%",
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
  flex: "1 1 auto",
};

const latestIssueSection = {
  padding: "100px 20px",
  background: "linear-gradient(135deg, #0B3C5D, #164B75)",
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
  marginTop: "auto",
  width: "fit-content",
};

const footerStyle = {
  backgroundColor: "#0B3C5D",
  color: "white",
  textAlign: "center",
  padding: "25px",
};

const heroStatsCard = {
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(10px)",
  borderRadius: "25px",
  padding: "35px",
  border: "1px solid rgba(255,255,255,0.2)",
};

const metricRow = {
  marginBottom: "20px",
};

const secondaryDarkBtn = {
  padding: "14px 30px",
  borderRadius: "30px",
  border: "none",
  background: "#0B3C5D",
  color: "white",
  cursor: "pointer",
  fontWeight: "600",
};

export default Home;
