const mongoose = require("mongoose");
require("dotenv").config();

var mongoURL = process.env.MONGOURL;

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var db = mongoose.connection;

db.on("connected", () => {
  console.log("Your database connected successfully...!");
});

db.on("error", () => {
  console.log("database connection failed");
});

module.exports = mongoose;
