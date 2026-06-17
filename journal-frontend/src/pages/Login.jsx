import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

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
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div style={pageContainer}>
      {/* LEFT PANEL */}

      <div style={leftPanel}>
        <h1 style={brandTitle}>
          Scientific Journal Platform
        </h1>

        <p style={brandText}>
          Publish, Review and Manage scholarly articles
          through a modern peer-review ecosystem.
        </p>

        <div style={statsContainer}>
          <div style={statCard}>
            <h2>250+</h2>
            <p>Submissions</p>
          </div>

          <div style={statCard}>
            <h2>120+</h2>
            <p>Reviewers</p>
          </div>

          <div style={statCard}>
            <h2>85%</h2>
            <p>Acceptance</p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}

      <div style={rightPanel}>
        <div style={loginCard}>
          <h2 style={heading}>Welcome Back</h2>

          <p style={subHeading}>
            Sign in to continue your journal workflow
          </p>

          <form onSubmit={handleSubmit}>
            <div style={inputGroup}>
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                style={inputStyle}
                required
              />
            </div>

            <div style={inputGroup}>
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                style={inputStyle}
                required
              />
            </div>

            <button type="submit" style={loginBtn}>
              Login
            </button>

            {/* Divider */}

            <div style={divider}>
              <div style={dividerLine}></div>

              <span>OR</span>

              <div style={dividerLine}></div>
            </div>

            {/* Google Login */}

            <button
              type="button"
              onClick={() => {
                window.location.href =
                  "http://localhost:5000/api/auth/google";
              }}
              style={googleBtn}
            >
              <FcGoogle size={24} />
              Continue with Google
            </button>

            <p style={signupText}>
              Don't have an account?

              <Link
                to="/signup"
                style={signupLink}
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const pageContainer = {
  minHeight: "100vh",
  display: "flex",
  background:
    "linear-gradient(135deg,#071B2E,#0B3C5D,#328CC1)",
};

const leftPanel = {
  flex: 1,
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "80px",
};

const brandTitle = {
  fontSize: "54px",
  fontWeight: "700",
  marginBottom: "20px",
};

const brandText = {
  fontSize: "18px",
  maxWidth: "600px",
  lineHeight: "1.8",
  opacity: 0.9,
};

const statsContainer = {
  display: "flex",
  gap: "20px",
  marginTop: "50px",
  flexWrap: "wrap",
};

const statCard = {
  background: "rgba(255,255,255,0.12)",
  padding: "25px",
  borderRadius: "16px",
  backdropFilter: "blur(8px)",
  minWidth: "140px",
};

const rightPanel = {
  width: "500px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px",
};

const loginCard = {
  width: "100%",
  background: "rgba(255,255,255,0.95)",
  borderRadius: "24px",
  padding: "45px",
  boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
};

const heading = {
  textAlign: "center",
  fontWeight: "700",
  marginBottom: "10px",
  color: "#0B3C5D",
};

const subHeading = {
  textAlign: "center",
  color: "#666",
  marginBottom: "30px",
};

const inputGroup = {
  marginBottom: "20px",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  marginTop: "8px",
  outline: "none",
};

const loginBtn = {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "12px",
  background: "#0B3C5D",
  color: "white",
  fontWeight: "600",
  marginTop: "10px",
};

const divider = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  margin: "25px 0",
};

const dividerLine = {
  flex: 1,
  height: "1px",
  background: "#ddd",
};

const googleBtn = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  background: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
};

const signupText = {
  textAlign: "center",
  marginTop: "25px",
};

const signupLink = {
  marginLeft: "6px",
  color: "#0B3C5D",
  textDecoration: "none",
  fontWeight: "600",
};

export default Login;