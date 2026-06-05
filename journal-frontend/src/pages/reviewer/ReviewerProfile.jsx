import { useEffect, useState } from "react";
import ReviewerLayout from "../../layouts/ReviewerLayout";
import {
  getReviewerProfile,
  updateReviewerProfile,
} from "../../services/paperService";

function ReviewerProfile() {
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

      setFormData({
        institution: data.institution || "",
        designation: data.designation || "",
        experienceYears: data.experienceYears || "",
        orcid: data.orcid || "",
        journalCategory:
          data.journalCategory || "",
        expertiseAreas:
          data.expertiseAreas?.join(", ") || "",
        researchInterests:
          data.researchInterests?.join(", ") || "",
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
    } catch (error) {
      console.log(error);
      alert("Failed to update profile");
    }
  };

  return (
    <ReviewerLayout>
      <h2 style={titleStyle}>My Reviewer Profile</h2>

      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroup}>
          <label>Institution</label>

          <input
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
          />
        </div>

        <div style={inputGroup}>
          <label>Designation</label>

          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
          />
        </div>

        <div style={inputGroup}>
          <label>Experience Years</label>

          <input
            type="number"
            name="experienceYears"
            value={formData.experienceYears}
            onChange={handleChange}
          />
        </div>

        <div style={inputGroup}>
          <label>ORCID</label>

          <input
            type="text"
            name="orcid"
            value={formData.orcid}
            onChange={handleChange}
            placeholder="0000-0000-0000-0000"
          />
        </div>

        <div style={inputGroup}>
          <label>Journal Category</label>

          <select
            name="journalCategory"
            value={formData.journalCategory}
            onChange={handleChange}
            required
            
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
            type="text"
            name="expertiseAreas"
            value={formData.expertiseAreas}
            onChange={handleChange}
            placeholder="Machine Learning, Deep Learning, NLP"
          />
        </div>

        <div style={inputGroup}>
          <label>Research Interests</label>

          <input
            type="text"
            name="researchInterests"
            value={formData.researchInterests}
            onChange={handleChange}
            placeholder="Medical AI, LLMs, Computer Vision"
          />
        </div>

        <div style={inputGroup}>
          <label>Biography</label>

          <textarea
            rows="5"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write a short professional biography..."
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Save Profile
        </button>
      </form>
    </ReviewerLayout>
  );
}

const titleStyle = {
  marginBottom: "30px",
  fontSize: "30px",
  fontWeight: "700",
};

const formStyle = {
  background: "white",
  padding: "35px",
  borderRadius: "15px",
  maxWidth: "800px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
};

const inputGroup = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "20px",
};

const buttonStyle = {
  backgroundColor: "#0B3C5D",
  color: "white",
  padding: "12px 20px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default ReviewerProfile;