const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const { data } = require("./data");

mongoose
  .connect("mongodb://127.0.0.1:27017/wanderlust")
  .then(async () => {
    console.log("MONGODB_ATLAS connected");
    await Listing.deleteMany({});
    await Listing.insertMany(data);
    console.log("Seeded all listings!");
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
