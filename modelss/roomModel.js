const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    name: { type: String, require },
    price: { type: Number, require },
    category: { type: String, require },
    img: { type: String, require },
    amenities: { type: String, require },
  },
  {
    timestamps: true,
  }
);

const roomModel = mongoose.model("rooms", roomSchema);

module.exports = roomModel;
