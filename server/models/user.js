const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Room = require("../models/room");

const UserSchema = new Schema({
    username: String,
    first_name: String,
    last_name: String,
    email: String,
    rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }]
    
});

module.exports = mongoose.model("User", UserSchema);