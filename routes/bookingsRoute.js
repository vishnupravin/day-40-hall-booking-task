const express = require("express");
const router = express.Router();
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const stripe = require("stripe")(
  "sk_test_51NMH64SC96NNfb5Kmrk4zu4ENsot9BfaniOuKvtTUujLhNlP5mjgd6gvi5jQbXAuhqrZSHMjQV8giz9lv4ZzSysX00Wi8ewfcG"
);
const Booking = require("../modelss/bookingModel");

router.post("/placebooking", async (req, res) => {
  const { token, subtotal, currentUser } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: subtotal * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    if (payment) {
      const newbooking = new Booking({
        name: currentUser.name,
        email: currentUser.email,
        userid: currentUser._id,
        category: currentUser.category,
        date: currentUser.date,
      });
      newbooking.save();
      res.send("Booking Successfully");
    } else {
      res.send("Payment Failed");
    }
  } catch (error) {
    return res.status(400).json({ message: "Something Went Wrong" + error });
  }
});

router.post("/getuserbookings", async (req, res) => {
  const { userid } = req.body;
  try {
    const bookings = await Booking.find({ userid: userid }).sort({ _id: -1 });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ message: "Something Went Wrong" });
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/deliverbooking", async (req, res) => {
  const bookingid = req.body.bookingid;
  try {
    const booking = await Booking.findOne({ _id: bookingid });
    booking.isDelivered = true;
    await booking.save();
    res.send("Booking Delivered Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
