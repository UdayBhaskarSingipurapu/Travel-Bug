const sampleData = [
  {
    title: "Luxury Ocean View Room",
    description: "A premium ocean view room with all amenities.",
    price: 500,
    location: "Malibu",
    country: "USA",
    image:
      "https://slovenia-prestige.com/wp-content/uploads/2016/03/Sample-Hotel-presentation-Photo-Gallery-3-750x400.jpg",
  },
  {
    title: "Mountain Retreat",
    description: "Relax in the serene mountains with a luxury cabin stay.",
    price: 300,
    location: "Aspen",
    country: "USA",
    image:
      "https://ieltsninja.com/content/wp-content/uploads/2021/01/Describe-a-Special-Hotel-You-Stayed-In.jpg",
  },
  {
    title: "Beachside Resort",
    description: "Experience the best beachside resort in the Caribbean.",
    price: 250,
    location: "Bahamas",
    country: "Bahamas",
    image:
      "https://news.airbnb.com/wp-content/uploads/sites/4/2018/02/c8d58f6f-4388-4a75-978d-1afa90c301f4.jpg",
  },
  {
    title: "City Center Suite",
    description: "A chic suite located in the heart of the city.",
    price: 400,
    location: "New York",
    country: "USA",
    image:
      "https://a0.muscache.com/im/pictures/d6ce61b5-87e5-4f45-b54d-42f2f7ef9a55.jpg",
  },
  {
    title: "Romantic Getaway",
    description: "A cozy room perfect for a romantic vacation.",
    price: 350,
    location: "Paris",
    country: "France",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1IFCTl8-24lCYlJHqXeuzYgjRCwY25dY_MQ&s",
  },
  {
    title: "Penthouse Suite",
    description: "Stay in a luxurious penthouse suite with panoramic views.",
    price: 1000,
    location: "Dubai",
    country: "UAE",
    image:
      "https://slovenia-prestige.com/wp-content/uploads/2016/03/Sample-Hotel-presentation-Photo-Gallery-3-750x400.jpg",
  },
  {
    title: "Countryside Inn",
    description: "A quaint countryside inn for a peaceful retreat.",
    price: 200,
    location: "Kentucky",
    country: "USA",
    image:
      "https://ieltsninja.com/content/wp-content/uploads/2021/01/Describe-a-Special-Hotel-You-Stayed-In.jpg",
  },
  {
    title: "Ski Resort Chalet",
    description: "Stay in a ski resort chalet with direct access to slopes.",
    price: 600,
    location: "Swiss Alps",
    country: "Switzerland",
    image:
      "https://news.airbnb.com/wp-content/uploads/sites/4/2018/02/c8d58f6f-4388-4a75-978d-1afa90c301f4.jpg",
  },
  {
    title: "Eco-Friendly Lodge",
    description: "A sustainable lodge with eco-friendly features.",
    price: 280,
    location: "Costa Rica",
    country: "Costa Rica",
    image:
      "https://a0.muscache.com/im/pictures/d6ce61b5-87e5-4f45-b54d-42f2f7ef9a55.jpg",
  },
  {
    title: "Historic Mansion",
    description:
      "A historic mansion offering old-world charm and modern luxury.",
    price: 450,
    location: "New Orleans",
    country: "USA",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1IFCTl8-24lCYlJHqXeuzYgjRCwY25dY_MQ&s",
  },
  {
    title: "Luxury Desert Camp",
    description: "Enjoy the beauty of the desert in a luxurious tented camp.",
    price: 700,
    location: "Sahara Desert",
    country: "Morocco",
    image:
      "https://slovenia-prestige.com/wp-content/uploads/2016/03/Sample-Hotel-presentation-Photo-Gallery-3-750x400.jpg",
  },
  {
    title: "Coastal Villa",
    description: "Private villa with stunning views of the coast.",
    price: 550,
    location: "Santorini",
    country: "Greece",
    image:
      "https://ieltsninja.com/content/wp-content/uploads/2021/01/Describe-a-Special-Hotel-You-Stayed-In.jpg",
  },
  {
    title: "Vineyard Estate",
    description:
      "Stay in a luxury vineyard estate and enjoy wine-tasting tours.",
    price: 600,
    location: "Napa Valley",
    country: "USA",
    image:
      "https://news.airbnb.com/wp-content/uploads/sites/4/2018/02/c8d58f6f-4388-4a75-978d-1afa90c301f4.jpg",
  },
  {
    title: "All-Inclusive Resort",
    description:
      "An all-inclusive resort with world-class amenities and dining.",
    price: 800,
    location: "Jamaica",
    country: "Jamaica",
    image:
      "https://a0.muscache.com/im/pictures/d6ce61b5-87e5-4f45-b54d-42f2f7ef9a55.jpg",
  },
  {
    title: "Business Hotel",
    description:
      "A modern hotel with all the amenities for business travelers.",
    price: 220,
    location: "Berlin",
    country: "Germany",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1IFCTl8-24lCYlJHqXeuzYgjRCwY25dY_MQ&s",
  },
  {
    title: "Luxury Spa Retreat",
    description: "Indulge in a luxury spa retreat with wellness services.",
    price: 650,
    location: "Bali",
    country: "Indonesia",
    image:
      "https://slovenia-prestige.com/wp-content/uploads/2016/03/Sample-Hotel-presentation-Photo-Gallery-3-750x400.jpg",
  },
  {
    title: "Private Island Resort",
    description: "An exclusive private island resort for ultimate relaxation.",
    price: 1500,
    location: "Maldives",
    country: "Maldives",
    image:
      "https://ieltsninja.com/content/wp-content/uploads/2021/01/Describe-a-Special-Hotel-You-Stayed-In.jpg",
  },
  {
    title: "Lakeview Lodge",
    description: "A lakeside lodge with tranquil views and outdoor activities.",
    price: 350,
    location: "Lake Tahoe",
    country: "USA",
    image:
      "https://news.airbnb.com/wp-content/uploads/sites/4/2018/02/c8d58f6f-4388-4a75-978d-1afa90c301f4.jpg",
  },
  {
    title: "Mountain Lodge",
    description:
      "A charming lodge nestled in the mountains for a peaceful escape.",
    price: 450,
    location: "Colorado",
    country: "USA",
    image:
      "https://a0.muscache.com/im/pictures/d6ce61b5-87e5-4f45-b54d-42f2f7ef9a55.jpg",
  },
  {
    title: "Oceanfront Condo",
    description:
      "An oceanfront condo with stunning views and easy beach access.",
    price: 400,
    location: "Miami",
    country: "USA",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1IFCTl8-24lCYlJHqXeuzYgjRCwY25dY_MQ&s",
  },
];

module.exports = { data: sampleData };
