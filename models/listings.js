const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Sample hotel-related image URLs
const sampleHotelImages = [
  "https://slovenia-prestige.com/wp-content/uploads/2016/03/Sample-Hotel-presentation-Photo-Gallery-3-750x400.jpg",
  "https://ieltsninja.com/content/wp-content/uploads/2021/01/Describe-a-Special-Hotel-You-Stayed-In.jpg",
  "https://news.airbnb.com/wp-content/uploads/sites/4/2018/02/c8d58f6f-4388-4a75-978d-1afa90c301f4.jpg",
  "https://a0.muscache.com/im/pictures/d6ce61b5-87e5-4f45-b54d-42f2f7ef9a55.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1IFCTl8-24lCYlJHqXeuzYgjRCwY25dY_MQ&s",
];

// Function to randomly select an image URL
const getDefaultHotelImage = () => {
  return sampleHotelImages[
    Math.floor(Math.random() * sampleHotelImages.length)
  ];
};

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    default: getDefaultHotelImage(),
    set: (v) => (v == "" ? getDefaultHotelImage() : v), // Set a default hotel image if none is provided
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
