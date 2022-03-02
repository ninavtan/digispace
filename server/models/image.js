const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const User = require("../models/user");
const Room = require("../models/room");

const ImageSchema = new Schema({
    name: String,
    desc: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    room: { type: Schema.Types.ObjectId, ref: "Room" },
    img: 
    {
      data: Buffer,
      contentType: String
    }
});

module.exports = mongoose.model("Image", ImageSchema);