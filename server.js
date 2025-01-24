const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listings.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utlis/ExpressError");
require("dotenv").config();
const listingRouter = require("./API/listingRoute.js");
const reviewRouter = require("./API/reviewRoute.js");
const session = require("express-session");
const flash = require("connect-flash");

main()
  .then((res) => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(process.env.DB_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

const sessionOptions = {
  secret : process.env.SECRET,
  resave : false,
  saveUninitialized : true,
  cookie : {
    expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly : true
  }
};


app.use(session(sessionOptions));
app.use(flash());

app.get("/", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

app.use((req, res, next) => {
  const listingFlash = req.flash("listing")
  res.locals.listing = listingFlash;
  console.log(res.locals.listing);
  const listingFlashErr = req.flash("listError");
  res.locals.listErr = listingFlashErr;
  next();
})

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { message = "Something went wrong", statusCode = 500 } = err;
  // res.status(statusCode).send(message);
  res.render("error.ejs", { message, statusCode });
});

app.listen(5050, () => {
  console.log("app listening on port 5050");
});
