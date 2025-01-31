const Listing = require("../models/listings");
const {listSchema} = require("../listSchemaJoi");
const ExpressError = require("../utlis/ExpressError");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.newListingForm = (req, res) => {
  res.render("listings/addnew.ejs");
};

module.exports.postNewListing = async (req, res, next) => {
  let url = req.file.path 
  let filename = req.file.filename 

  // Add image to request body before validation
  req.body.listing.image = { url, filename };

  // Validate after adding image
  const { error } = listSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return next(new ExpressError(error.details.map((err) => err.message).join(","), 400));
  }

  // Proceed with listing creation
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "Listing Created Successfully");
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
  let originalUrl = listdata.image.url;
  originalUrl = originalUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listdata, originalUrl });
};

module.exports.postEditedListing = async (req, res) => {
  let { id } = req.params;
  // if(!req.body.listing) throw new ExpressError('Add relevant details', 400);
  if(req.file){
    let url = req.file.path;
    let filename = req.file.filename;
    req.body.listing.image = {url , filename};
  } else {
    let oldlisting = await Listing.findById(id);
    req.body.listing.image = oldlisting.image; // Preserve existing image
  }

  const { error } = listSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return next(new ExpressError(error.details.map((err) => err.message).join(","), 400));
  }

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
