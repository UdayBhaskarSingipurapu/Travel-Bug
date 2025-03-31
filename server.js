const express = require("express");                     // Importing the Express framework for building the web app
const app = express();                                  // Initializing the Express app
const mongoose = require("mongoose");                   // Importing Mongoose for MongoDB object modeling
const path = require("path");                           // Importing the Node.js path module for file/directory path handling
const Listing = require("./models/listings.js");        // Importing the Listing model for MongoDB operations
const methodOverride = require("method-override");      // Allows using HTTP verbs like PUT and DELETE in forms
const ejsMate = require("ejs-mate");                    // Enables layout and partial support for EJS templates
const ExpressError = require("./utlis/ExpressError");   // Custom error class for better error handling
require("dotenv").config();                             // Loads environment variables from a `.env` file
const listingRouter = require("./API/listingRoute.js"); // Router for handling listing-related routes
const reviewRouter = require("./API/reviewRoute.js");   // Router for handling review-related routes
const session = require("express-session");             // Middleware for managing session data
const flash = require("connect-flash");                 // Middleware for flash messages
const User = require("./models/user.js");               // Importing the User model for authentication
const passport = require("passport");                   // Middleware for handling user authentication
const LocalStrategy = require("passport-local");        // Passport strategy for local authentication
const userRouter = require("./API/userRouter.js");      // Router for handling user-related routes
const MongoStore = require('connect-mongo');
const cors = require('cors');

app.use(cors({
  origin: "*",                   // Allow requests from any origin
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],  // Allowed methods
  allowedHeaders: "Content-Type, Authorization, X-Requested-With"
}));

// Connecting to MongoDB database
main()
  .then((res) => {
    console.log("connection successful");               // Log success message when connection is established
  })
  .catch((err) => {
    console.log(err);                                   // Log error message if connection fails
  });

async function main() {
  await mongoose.connect(process.env.DB_URL);           // Connects to the MongoDB database using the URL from .env file
}

// Configuring EJS as the view engine
app.set("view engine", "ejs");                          // Set the view engine to EJS
app.set("views", path.join(__dirname, "views"));        // Set the directory for view templates

// Middleware configurations
app.use(express.urlencoded({ extended: true }));        // Parses URL-encoded form data
app.use(methodOverride("_method"));                     // Allows overriding HTTP methods with a query parameter
app.engine("ejs", ejsMate);                             // Set ejs-mate as the template engine
app.use(express.static(path.join(__dirname, "public"))); // Serves static files from the 'public' directory

// Session configuration
app.use(session({
  secret: process.env.SECRET, 
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      collectionName: "sessions",
      ttl: 7 * 24 * 60 * 60,
  }),
  cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,  
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" 
  }
}));

app.use(flash());                                       // Enables flash messages

// Passport configuration for user authentication
app.use(passport.initialize());                         // Initializes Passport
app.use(passport.session());                            // Enables persistent login sessions
passport.use(new LocalStrategy(User.authenticate()));   // Configures the local strategy for Passport

passport.serializeUser(User.serializeUser());           // Serializes user data into the session
passport.deserializeUser(User.deserializeUser());       // Deserializes user data from the session

// Route for the home page
app.get("/", async (req, res) => {
  // const allListings = await Listing.find({});           // Fetches all listings from the database
  // res.render("listings/index.ejs", { allListings });    // Renders the index page with all listings
  res.redirect("/listings");
});

// Flash message middleware
app.use((req, res, next) => {
  const success = req.flash("success");                 // Retrieves success flash messages
  res.locals.success = success;                         // Makes success messages available in views
  const error = req.flash("error");                     // Retrieves error flash messages
  res.locals.error = error;                             // Makes error messages available in views
  const currUser = req.user;
  res.locals.currUser = currUser;
  next();
});



// Router configuration
app.use("/listings", listingRouter);                    // Adds routes for listings
app.use("/listings/:id/reviews", reviewRouter);         // Adds routes for reviews related to a specific listing
app.use("/user", userRouter);                           // Adds routes for user-related actions

// Catch-all route for undefined paths
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));        // Passes a 404 error to the error-handling middleware
});

// Error-handling middleware
app.use((err, req, res, next) => {
  const { message = "Something went wrong", statusCode = 500 } = err; // Extracts error details
  res.render("error.ejs", { message, statusCode });     // Renders an error page
});

// Start the server
app.listen(5050, () => {
  console.log("app listening on port 5050");            // Logs a message when the server starts
});
