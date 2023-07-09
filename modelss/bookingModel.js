const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    name: { type: String, require },
    email: { type: String, require },
    userid: { type: String, require },
    category: { type: String, require },
    date: { type: String, require },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bookings", bookingSchema);
