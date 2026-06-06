import { useEffect, useState } from "react";
import ReviewerLayout from "../../layouts/ReviewerLayout";
import {
  getReviewerProfile,
  updateReviewerProfile,
} from "../../services/paperService";

function ReviewerProfile() {
  const [profileStats, setProfileStats] = useState(null);

  const [formData, setFormData] = useState({
    institution: "",
    designation: "",
    experienceYears: "",
    orcid: "",
    journalCategory: "",
    expertiseAreas: "",
    researchInterests: "",
    bio: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getReviewerProfile();

      setProfileStats(data);

      setFormData({
        institution: data.institution || "",
        designation: data.designation || "",
        experienceYears: data.experienceYears || "",
        orcid: data.orcid || "",
        journalCategory: data.journalCategory || "",
        expertiseAreas: data.expertiseAreas?.join(", ") || "",
        researchInterests: data.researchInterests?.join(", ") || "",
        bio: data.bio || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateReviewerProfile({
        ...formData,

        expertiseAreas: formData.expertiseAreas
          .split(",")
          .map((item) => item.trim()),

        researchInterests: formData.researchInterests
          .split(",")
          .map((item) => item.trim()),
      });

      alert("Profile updated successfully");

      loadProfile();
    } catch (error) {
      console.log(error);
      alert("Failed to update profile");
    }
  };

  return (
    <ReviewerLayout>
      {/* HEADER */}

      <div style={headerCard}>
        <div style={avatar}>
          {profileStats?.name?.charAt(0)?.toUpperCase() || "R"}
        </div>

        <div>
          <h1 style={nameStyle}>
            {profileStats?.name || "Reviewer"}
          </h1>

          <p style={designationStyle}>
            {profileStats?.designation || "Reviewer"}
          </p>

          <p style={institutionStyle}>
            {profileStats?.institution || "Institution Not Added"}
          </p>

          <span style={categoryBadge}>
            {profileStats?.journalCategory}
          </span>
        </div>
      </div>

      {/* STATS */}

      <div style={statsGrid}>
        <StatCard
          title="Completed Reviews"
          value={profileStats?.reviewsCompleted || 0}
        />

        <StatCard
          title="Active Assignments"
          value={profileStats?.activeAssignments || 0}
        />

        <StatCard
          title="Experience"
          value={`${profileStats?.experienceYears || 0} Years`}
        />
      </div>

      {/* PROFILE SUMMARY */}

      <div style={summaryCard}>
        <h2 style={sectionTitle}>Professional Biography</h2>

        <p>
          {profileStats?.bio ||
            "No biography available. Add your professional background and research achievements."}
        </p>
      </div>

      {/* FORM */}

      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={sectionTitle}>Reviewer Information</h2>

        <div style={grid}>
          <InputField
            label="Institution"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
          />

          <InputField
            label="Designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
          />

          <InputField
            label="Experience Years"
            name="experienceYears"
            type="number"
            value={formData.experienceYears}
            onChange={handleChange}
          />

          <InputField
            label="ORCID"
            name="orcid"
            value={formData.orcid}
            onChange={handleChange}
          />
        </div>

        <div style={inputGroup}>
          <label>Journal Category</label>

          <select
            name="journalCategory"
            value={formData.journalCategory}
            onChange={handleChange}
            style={inputStyle}
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
          <label>Expertise Areas</label>

          <input
            style={inputStyle}
            type="text"
            name="expertiseAreas"
            value={formData.expertiseAreas}
            onChange={handleChange}
            placeholder="Machine Learning, NLP, Deep Learning"
          />
        </div>

        <div style={inputGroup}>
          <label>Research Interests</label>

          <input
            style={inputStyle}
            type="text"
            name="researchInterests"
            value={formData.researchInterests}
            onChange={handleChange}
            placeholder="Computer Vision, LLMs, Medical AI"
          />
        </div>

        <div style={inputGroup}>
          <label>Biography</label>

          <textarea
            rows="6"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            style={textareaStyle}
          />
        </div>

        <button type="submit" style={saveBtn}>
          Save Profile
        </button>
      </form>
    </ReviewerLayout>
  );
}

/* COMPONENTS */

function StatCard({ title, value }) {
  return (
    <div style={statCard}>
      <h2>{value}</h2>
      <p>{title}</p>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div style={inputGroup}>
      <label>{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        style={inputStyle}
      />
    </div>
  );
}

/* STYLES */

const headerCard = {
  background:
    "linear-gradient(135deg,#0B3C5D,#1F5C89)",
  color: "white",
  padding: "35px",
  borderRadius: "20px",
  display: "flex",
  gap: "25px",
  alignItems: "center",
  marginBottom: "25px",
};

const avatar = {
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  background: "rgba(255,255,255,0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "38px",
  fontWeight: "bold",
};

const nameStyle = {
  margin: 0,
  fontSize: "30px",
};

const designationStyle = {
  margin: "6px 0",
};

const institutionStyle = {
  marginBottom: "10px",
};

const categoryBadge = {
  background: "rgba(255,255,255,0.2)",
  padding: "8px 14px",
  borderRadius: "30px",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "20px",
  marginBottom: "25px",
};

const statCard = {
  background: "white",
  padding: "25px",
  borderRadius: "16px",
  textAlign: "center",
  boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
};

const summaryCard = {
  background: "white",
  padding: "25px",
  borderRadius: "16px",
  marginBottom: "25px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
};

const sectionTitle = {
  color: "#0B3C5D",
  marginBottom: "20px",
};

const formStyle = {
  background: "white",
  padding: "35px",
  borderRadius: "18px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(250px,1fr))",
  gap: "20px",
};

const inputGroup = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "20px",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const textareaStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const saveBtn = {
  background: "#0B3C5D",
  color: "white",
  border: "none",
  padding: "14px 24px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "15px",
};

export default ReviewerProfile;