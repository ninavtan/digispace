const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Settings = require("../models/settings");
const User = require("../models/user");
const Image = require("../models/image");

const RoomSchema = new Schema({
    name: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    roomSettings: { type: Schema.Types.ObjectId, ref: "Settings" },
    authUsers: [],
    gallery: [{ type: Schema.Types.ObjectId, ref: "Image" }],
});

module.exports = mongoose.model("Room", RoomSchema);