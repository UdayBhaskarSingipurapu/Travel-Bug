const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const wrapAsync = require("../utlis/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares");
const {
  registerForm,
  validateUserRegister,
  validateUserLogin,
  loginForm,
  logoutUser,
} = require("../controller/user");

router.get("/signup", registerForm);

router.post("/signup", wrapAsync(validateUserRegister));

router.get("/login", loginForm);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/user/login",
    failureFlash: true,
  }),
  wrapAsync(validateUserLogin)
);

router.get("/logout", logoutUser);

module.exports = router;
