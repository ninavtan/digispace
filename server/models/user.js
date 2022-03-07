const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Room = require("../models/room");
const Image = require("../models/image");

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: String,
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true,
    },
    rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
    gallery: [{ type: Schema.Types.ObjectId, ref: "Image"}]
    
}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);