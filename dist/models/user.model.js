"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    lastName1: {
        type: String,
        required: true,
    },
    lastName2: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    post: {
        type: String,
        required: true,
    },
    zone: {
        type: String,
    },
    station: {
        type: String,
    },
}, { timestamps: true, versionKey: false });
exports.default = (0, mongoose_1.model)("User", userSchema);
