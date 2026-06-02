import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole, allowedRoles }) {

  const role = localStorage.getItem("role");
  const isAuth = localStorage.getItem("isAuthenticated");

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  // Support both allowedRole (single) and allowedRoles (array)
  const allowedRolesList = allowedRoles || (allowedRole ? [allowedRole] : []);
  
  if (allowedRolesList.length > 0 && !allowedRolesList.includes(role)) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;