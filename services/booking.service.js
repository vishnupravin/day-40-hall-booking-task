import { client } from "../index.js";

export async function addBookings(data) {
  return await client.db("b39wd").collection("hallbook").insertMany(data);
}
export async function getCustomerStatus() {
  return await client
    .db("b39wd")
    .collection("hallbook")
    .aggregate([
      {
        $lookup: {
          from: "roomcreate",
          localField: "fk",
          foreignField: "roomId",
          as: "RoomDetails",
        },
      },
      {
        $project: {
          "RoomDetails.roomName": 1,
          customerName: 1,
          date: 1,
          startTime: 1,
          endTime: 1,
        },
      },
    ])
    .toArray();
}
export async function getBookingStatus() {
  return await client
    .db("b39wd")
    .collection("hallbook")
    .aggregate([
      {
        $lookup: {
          from: "roomcreate",
          localField: "fk",
          foreignField: "roomId",
          as: "RoomDetails",
        },
      },
      {
        $project: {
          "RoomDetails.roomName": 1,
          "RoomDetails.status": 1,
          customerName: 1,
          date: 1,
          startTime: 1,
          endTime: 1,
        },
      },
    ])
    .toArray();
}
export async function getAllbookings() {
  return await client.db("b39wd").collection("hallbook").find().toArray();
}

export async function getRoomDetails(date, startTime, endTime) {
  return await client
    .db("b39wd")
    .collection("hallbook")
    .findOne({ date: date, startTime: startTime, endTime: endTime });
}
