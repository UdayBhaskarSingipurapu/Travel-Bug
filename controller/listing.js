const Listing = require("../models/listings");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.newListingForm = (req, res) => {
  res.render("listings/addnew.ejs");
};

module.exports.postNewListing = async (req, res, next) => {
  // let {title, description, image, price, location, country} = req.body;
  // let list = req.body.listing;
  // const newListing = new Listing(list);
  // console.log(newListing);
  // if(!req.body.listing) throw new ExpressError('Add relevant details', 400);
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("listing", "Listing Created Successfully");
  res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let listdata = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listdata) {
    req.flash("listError", "Listing does not exists!");
    res.redirect("/listings");
  }
  // console.log(listdata);
  res.render("listings/show.ejs", { listdata });
};

module.exports.editListingForm = async (req, res) => {
  let { id } = req.params;
  let listdata = await Listing.findById(id);
  if (!listdata) {
    req.flash("listError", "Listing does not exists!");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listdata });
};

module.exports.postEditedListing = async (req, res) => {
  let { id } = req.params;
  // if(!req.body.listing) throw new ExpressError('Add relevant details', 400);
  const updatedList = req.body.listing;
  // console.log(updatedList);
  await Listing.findByIdAndUpdate(
    id,
    { ...updatedList },
    { runValidators: true, new: true }
  );
  req.flash("listing", "Listing Updated Successfully");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("listing", "Listing Deleted Successfully");
  res.redirect("/listings");
};
