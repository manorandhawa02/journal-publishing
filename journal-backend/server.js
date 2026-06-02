const express = require("express");
const app = express();
require("dotenv").config();
const session = require("express-session");
const passport = require("./config/passport");
const issueRoutes = require("./routes/issueRoutes");

const cors = require("cors");

// DB
const connectDB = require("./config/db");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const paperRoutes = require("./routes/paperRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminRoutes = require("./routes/adminRoutes");
const journalRoutes = require("./routes/journalRoutes");
const publishedRoutes = require("./routes/publishedRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// ================= CONNECT DB =================
connectDB();

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/paper", paperRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/journal", journalRoutes);
app.use("/api/published", require("./routes/publishedRoutes"));
app.use("/api/notifications", notificationRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/issues", issueRoutes);

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("🚀 Server Running...");
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
