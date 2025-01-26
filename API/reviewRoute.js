const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utlis/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listings.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middlewares.js');


// post review
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(async (req, res) => {
    let id = req.params.id;
    let listing = await Listing.findById(id);
    let review = new Review(req.body.review);
    review.author = req.user._id;
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    // console.log("Review Saved");
    // res.send("Review saved");
    req.flash("listing", "Review Created Successfully");
    res.redirect(`/listings/${id}`);
  })
);

// delete review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("listing", "Review Deleted Successfully");
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
