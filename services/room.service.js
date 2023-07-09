import { client } from "../index.js";

export async function addRoom(data) {
  return await client.db("b39wd").collection("roomcreate").insertMany(data);
}
export async function getRoom() {
  return await client.db("b39wd").collection("roomcreate").find().toArray();
}
