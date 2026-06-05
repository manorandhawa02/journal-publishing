import API from "./api";
import axios from "axios";

// ================= SUBMIT PAPER =================
export const submitPaper = async (formData) => {
  const res = await API.post("/paper/submit", formData);
  return res.data;
};

// ================= GET ALL PAPERS =================
export const getAllPapers = async () => {
  const res = await API.get("/paper");

  return res.data;
};

// ================= GET MY PAPERS =================
export const getMyPapers = async () => {
  const res = await API.get("/paper/my");

  return res.data;
};

// ================= GET SINGLE PAPER =================
export const getPaperById = async (id) => {
  const res = await API.get(`/paper/${id}`);

  return res.data;
};

// ================= ASSIGN REVIEWER =================
export const assignReviewer = async (id, reviewerId) => {
  const res = await API.post(`/review/${id}/assign`, { reviewerId });
  return res.data;
};

// ================= SUBMIT REVIEW =================
export const submitReview = async (id, data) => {
  const res = await API.post(`/review/${id}/submit`, data);
  return res.data;
};

// ================= ACCEPT PAPER =================
export const acceptPaper = async (id) => {
  const res = await API.put(`/paper/${id}/accept`);
  return res.data;
};

// ================= REJECT PAPER =================
export const rejectPaper = async (
  id,
  reason
) => {

  const token = localStorage.getItem("token");

  const res = await axios.put(
    `http://localhost:5000/api/paper/${id}/reject`,
    { reason },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// ================= PUBLISH PAPER =================
export const publishPaper = async (id) => {

  const token = localStorage.getItem("token");

  const res = await axios.post(
    `http://localhost:5000/api/published/publish/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// ================= GET REVIEWERS =================
export const getReviewers = async () => {

  const token = localStorage.getItem("token");

  const res = await axios.get(
    "http://localhost:5000/api/admin/reviewers",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};



export const getAdminStats = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    "http://localhost:5000/api/admin/stats",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getAuthorStats = async () => {
  const res = await API.get("/admin/author-stats");
  return res.data;
};

export const getAssignedPapers = async () => {
  const res = await API.get("/review/assigned");
  return res.data;
};

export const getReviewerProfile = async () => {
  const res = await API.get("/review/profile");
  return res.data;
};

export const updateReviewerProfile = async (data) => {
  const res = await API.put("/review/profile", data);
  return res.data;
};