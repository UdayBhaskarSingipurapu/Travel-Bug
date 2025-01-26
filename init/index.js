const mongoose = require("mongoose");
const initListingData = require("./listingdata.js");
const Listing = require("../models/listings.js");
require("dotenv").config({ path: "../.env" });

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

const initListingDB = async () => {
  await Listing.deleteMany({});
  initListingData.data = initListingData.data.map((obj) => ({
    ...obj,
    owner: "6794faa1537f5874c0f1cc98",
  }));
  await Listing.insertMany(initListingData.data, {
    runValidators: true,
    new: true,
  });
  console.log("initialized");
};
initListingDB();
