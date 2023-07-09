const express = require("express");
const router = express.Router();
const Room = require("../modelss/roomModel");

router.get("/getallroom", async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addroom", async (req, res) => {
  const room = req.body.room;

  try {
    const newroom = new Room({
      name: room.name,
      img: room.img,
      amenities: room.amenities,
      category: room.category,
      price: room.price,
    });
    await newroom.save();
    res.send("New Room Added Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getroombyid", async (req, res) => {
  const roomid = req.body.roomid;

  try {
    const room = await Room.findOne({ _id: roomid });
    res.send(room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/editroom", async (req, res) => {
  const editedroom = req.body.editedroom;

  try {
    const room = await Room.findOne({ _id: editedroom._id });

    (room.name = editedroom.name),
      (room.amenities = editedroom.amenities),
      (room.img = editedroom.img),
      (room.category = editedroom.category),
      (room.price = editedroom.price);

    await room.save();

    res.send("room Details Edited successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/deleteroom", async (req, res) => {
  const roomid = req.body.roomid;

  try {
    await Room.findOneAndDelete({ _id: roomid });
    res.send("room Deleted successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
