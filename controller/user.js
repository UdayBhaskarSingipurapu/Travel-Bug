const User = require("../models/user");

module.exports.registerForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.validateUserRegister = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let newUser = new User({ username, email });
    let registeredUser = await User.register(newUser, password);
    // console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to TravelBug");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("/user/signup");
  }
};

module.exports.loginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.validateUserLogin = async (req, res) => {
  req.flash("success", "Welcome back to TravelBug!");
  // res.redirect("/listings");
  // console.log(req);
  // console.log(req.originalUrl);
  // res.redirect(req.originalUrl)
  // console.log(res.locals.redirectUrl);
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Successfully Logged Out!");
    res.redirect("/listings");
  });
};
