export default function StatusBadge({ status }) {
  // ================= STATUS COLORS =================
  const getStyles = () => {
    switch (status) {
      case "Draft":
        return {
          background: "#6b7280",
          label: "Draft",
        };

      case "Submitted":
        return {
          background: "#2563eb",
          label: "Submitted",
        };

      case "Initial Screening":
        return {
          background: "#0ea5e9",
          label: "Initial Screening",
        };

      case "Under Review":
        return {
          background: "#f59e0b",
          label: "Under Review",
        };

      case "Minor Revision":
        return {
          background: "#8b5cf6",
          label: "Minor Revision",
        };

      case "Major Revision":
        return {
          background: "#ea580c",
          label: "Major Revision",
        };

      case "Accepted":
        return {
          background: "#16a34a",
          label: "Accepted",
        };

      case "Rejected":
        return {
          background: "#dc2626",
          label: "Rejected",
        };

      case "Copyediting":
        return {
          background: "#0891b2",
          label: "Copyediting",
        };

      case "Published":
        return {
          background: "#15803d",
          label: "Published",
        };

      default:
        return {
          background: "#6b7280",
          label: status || "Unknown",
        };
    }
  };

  const styles = getStyles();

  return (
    <span
      style={{
        background: styles.background,
        color: "white",
        padding: "6px 14px",
        borderRadius: "999px",
        fontSize: "13px",
        fontWeight: "600",
        display: "inline-block",
        letterSpacing: "0.3px",
      }}
    >
      {styles.label}
    </span>
  );
}