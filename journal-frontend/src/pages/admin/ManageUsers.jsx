// src/pages/admin/ManageUsers.jsx
export default function ManageUsers() {
  return (
    <div>
      <h2 style={h2}>Manage Users</h2>
      <p style={p}>Create, edit, or deactivate users. Connect to GET /api/users (admin only).</p>
    </div>
  );
}
const h2 = { margin: "0 0 8px", fontSize: "20px", fontWeight: "600", color: "#0f172a" };
const p  = { fontSize: "14px", color: "#64748b" };
