import API from "./api";
import axios from "axios";

// ================= SUBMIT PAPER =================
export const submitPaper = async (formData) => {
  const res = await API.post(
    "/paper/submit",
    formData
  );

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
  try {
    const res = await API.get(`/paper/${id}`);
    return res.data;
  } catch (err) {
    // If not found on /paper, try published collection
    if (err.response && err.response.status === 404) {
      const res2 = await API.get(`/published/${id}`);
      return res2.data;
    }

    throw err;
  }
};

// ================= ASSIGN REVIEWER =================
export const assignReviewer = async (
  id,
  reviewerId
) => {

  const token = localStorage.getItem("token");

  const res = await axios.post(
    `http://localhost:5000/api/review/${id}/assign`,
    { reviewerId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// ================= SUBMIT REVIEW =================
export const submitReview = async (
  id,
  data
) => {

  const token = localStorage.getItem("token");

  const res = await axios.post(
    `http://localhost:5000/api/review/${id}/submit`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// ================= ACCEPT PAPER =================
export const acceptPaper = async (id) => {

  const token = localStorage.getItem("token");

  const res = await axios.put(
    `http://localhost:5000/api/paper/${id}/accept`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

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