const express = require("express");
const router = express.Router();
const { register, login, googleLoginSuccess, } = require("../controllers/authController");
const passport = require("passport");

router.post("/register", register);
router.post("/login", login);


router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  googleLoginSuccess
);

module.exports = router;