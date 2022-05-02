const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("../models/user");
const Room = require("../models/room");


const SettingsSchema = new Schema({
    name: String,
    userCreated: { type: Schema.Types.ObjectId, ref: "User" },
    roomId: { type: Schema.Types.ObjectId, ref: "Room" },
    collabCanvasFunc: Boolean,
    collabCanvasImg: String,
    sharedMedia: String,
    chatFunc: Boolean,
    galleryFunc: Boolean,
});

module.exports = mongoose.model("Settings", SettingsSchema);