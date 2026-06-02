import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const token = params.get("token");
    const role = params.get("role");

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("isAuthenticated", "true");

      if (role === "author") {
        navigate("/author");
      } else if (role === "reviewer") {
        navigate("/reviewer");
      } else {
        navigate("/admin");
      }
    }
  }, []);

  return <h2>Logging in...</h2>;
}

export default GoogleSuccess;  