import { useEffect, useState } from "react";
import axios from "axios";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
  const interval = setInterval(() => {
    fetchNotifications();
  }, 5000);

  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/notifications"
      );

      setNotifications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const unread = notifications.filter(
    (n) => !n.read
  ).length;

  return (
    <div style={bellStyle}>
      🔔

      {unread > 0 && (
        <span style={badgeStyle}>
          {unread}
        </span>
      )}
    </div>
  );
}

const bellStyle = {
  position: "relative",
  fontSize: "26px",
  cursor: "pointer",
};

const badgeStyle = {
  position: "absolute",
  top: "-8px",
  right: "-10px",
  background: "red",
  color: "white",
  borderRadius: "50%",
  padding: "3px 7px",
  fontSize: "12px",
};

export default NotificationBell;