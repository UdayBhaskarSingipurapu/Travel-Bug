const Review = require("../models/review");
const Listing = require("../models/listings");

module.exports.postReview = async (req, res) => {
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
};
module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("listing", "Review Deleted Successfully");
  res.redirect(`/listings/${id}`);
};
