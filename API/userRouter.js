const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const wrapAsync = require("../utlis/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares");

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      let newUser = new User({ username, email });
      let registeredUser = await User.register(newUser, password);
      // console.log(registeredUser);
      req.login(registeredUser, (err) => {
        if(err){
          next(err);
        }
        req.flash("success", "Welcome to TravelBug");
        res.redirect("/listings");
      });
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/user/signup");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/user/login",
    failureFlash: true,
  }),
  wrapAsync(async (req, res) => {
    req.flash("success", "Welcome back to TravelBug!");
    // res.redirect("/listings");
    // console.log(req);
    // console.log(req.originalUrl);
    // res.redirect(req.originalUrl)
    // console.log(res.locals.redirectUrl);
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  })
);

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if(err){
      return next(err);
    }
    req.flash("success", "Successfully Logged Out!");
    res.redirect('/listings');
  });
});

module.exports = router;
