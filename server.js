const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const Room = require("./modelss/roomModel");

const db = require("./db");
const roomsRoute = require("./routes/roomsRoute");
const bookingRoute = require("./routes/bookingsRoute");

app.use("/api/rooms/", roomsRoute);
app.use("/api/bookings/", bookingRoute);

// For creating Room

// const room = [
//   {
//     "name":"Room No & name",
//     "price":"Room Price",
//     "category":"ac - non ac",
//     "img":"room img",
//     "amenities":"room amenities - Air Conditioner, Smart TV, Telephone, Free Wifi ",
//   }
// ]

// For Booking

// const booking = [
//   {
//     "name": "vignesh",
//     "email": "vignesh@gmail.com",
//     "userid":"Id No",
//     "category":"Ac Or Non Ac",
//     "date":"11/11/1111"
//     }
// ]

app.get("/", function (request, response) {
  response.send("Your Server is Working for Hall booking, 🙋‍♂️, 🌏 🎊✨🤩");
});
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`The server started in: ${port} ✨✨`));
