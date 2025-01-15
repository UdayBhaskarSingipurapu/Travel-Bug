const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utlis/wrapAsync");
const ExpressError = require("../utlis/ExpressError");
const { listSchema } = require("../listSchemaJoi");
const Listing = require("../models/listings");

const validateListing = (req, res, next) => {
  const { error } = listSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(errMsg, 400);
  } else {
    next();
  }
};

// --- Index Route to show all listings--- //
router.get("/", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

// --- post new Listing --- //
// route for get request to add new post
router.get("/add", (req, res) => {
  res.render("listings/addnew.ejs");
});
// post details to db
router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res, next) => {
    // let {title, description, image, price, location, country} = req.body;
    // let list = req.body.listing;
    // const newListing = new Listing(list);
    // console.log(newListing);
    // if(!req.body.listing) throw new ExpressError('Add relevant details', 400);
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  })
);

// show route to display a single listing information
router.get("/:id", async (req, res) => {
  let { id } = req.params;
  let listdata = await Listing.findById(id).populate("reviews");
  res.render("listings/show.ejs", { listdata });
});

// --- Editing Route --- //
// get edit request
router.get("/:id/edit", async (req, res) => {
  let { id } = req.params;
  let listdata = await Listing.findById(id);
  res.render("listings/edit.ejs", { listdata });
});

// change details in DB
router.put(
  "/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    // if(!req.body.listing) throw new ExpressError('Add relevant details', 400);
    const updatedList = req.body.listing;
    // console.log(updatedList);
    await Listing.findByIdAndUpdate(
      id,
      { ...updatedList },
      { runValidators: true, new: true }
    );
    res.redirect(`/listings/${id}`);
  })
);

// Route to delete listings from DB
router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

module.exports = router;
