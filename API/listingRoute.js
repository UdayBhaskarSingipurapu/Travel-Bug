const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utlis/wrapAsync");
const Listing = require("../models/listings");
const { isLoggedIn, isOwner, validateListing } = require("../middlewares");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })
const {
  index,
  newListingForm,
  postNewListing,
  showListing,
  editListingForm,
  postEditedListing,
  deleteListing,
} = require("../controller/listing");

// --- Index Route to show all listings--- //
router.get("/", wrapAsync(index));

// --- post new Listing --- //
// route for get request to add new post
router.get("/add", isLoggedIn, newListingForm);

// post details to db
router.post(
  "/",
  isLoggedIn,
  upload.single("listing[image]"),
  wrapAsync(postNewListing)
);


// show route to display a single listing information
router.get("/:id", showListing);

// --- Editing Route --- //
// get edit request
router.get("/:id/edit", isLoggedIn, isOwner, editListingForm);

// change details in DB
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(postEditedListing)
);

// Route to delete listings from DB
router.delete("/:id", isLoggedIn, isOwner, deleteListing);

module.exports = router;
