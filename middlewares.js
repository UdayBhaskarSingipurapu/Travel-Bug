const Listing = require('./models/listings');
const ExpressError = require("./utlis/ExpressError");
const { listSchema } = require("./listSchemaJoi");
const { reviewSchema } = require("./listSchemaJoi.js");
const Review = require('./models/review.js');


module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create Listing");
        return res.redirect('/user/login');
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
      req.flash("error", "Unauthorized");
      return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing = (req, res, next) => {
    const { error } = listSchema.validate(req.body);
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(", ");
      throw new ExpressError(errMsg, 400);
    } else {
      next();
    }
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(", ");
      throw new ExpressError(errMsg, 400);
    } else {
      next();
    }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "Unauthorized");
        return res.redirect(`/listings/${id}`);
      }
    next();
}