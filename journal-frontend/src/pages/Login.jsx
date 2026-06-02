import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
// import { loginUser } from "../services/authService";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const data = await loginUser(formData);

  //     localStorage.setItem("token", data.token);

  //     localStorage.setItem("user", JSON.stringify(data.user));

  //     alert("Login successful");
  //   } catch (err) {
  //     console.log(err);

  //     alert(err.response?.data?.message || "Login failed");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      console.log(res.data);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("role", res.data.user.role);

      localStorage.setItem("isAuthenticated", "true");

      alert("Login Successful");

      if (res.data.user.role === "author") {
        navigate("/author");
      } else if (res.data.user.role === "reviewer") {
        navigate("/reviewer");
      } else if (res.data.user.role === "admin") {
        navigate("/admin");
      }
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(135deg, #1e3c72, #2a5298)" }}
    >
      <div
        className="card shadow-lg p-5 border-0"
        style={{
          width: "420px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
        }}
      >
        <h3 className="text-center mb-4">Journal System Login</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="w-100"
            style={{
              backgroundColor: "#0B3C5D",
              color: "white",
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              fontWeight: "600",
            }}
          >
            Login
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "20px 0",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "#ddd",
              }}
            />

            <span
              style={{
                margin: "0 10px",
                color: "#666",
                fontSize: "14px",
              }}
            >
              OR
            </span>

            <div
              style={{
                flex: 1,
                height: "1px",
                background: "#ddd",
              }}
            />
          </div>

          <button
            type="button"
            onClick={() => {
              window.location.href = "http://localhost:5000/api/auth/google";
            }}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
