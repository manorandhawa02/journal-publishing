import API from "./api";

// SIGNUP
export const signupUser = async (userData) => {
  const res = await API.post("/auth/signup", userData);
  return res.data;
};

// LOGIN
export const loginUser = async (userData) => {
  const res = await API.post("/auth/login", userData);
  return res.data;
};