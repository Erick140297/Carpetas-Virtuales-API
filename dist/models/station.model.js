"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const stationSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    zone: {
        type: String,
        required: true,
    },
    manager: {
        type: String,
        required: true,
    },
    supervisor: {
        type: String,
        required: true,
    },
    directory: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Folder" }],
}, { timestamps: true, versionKey: false });
exports.default = (0, mongoose_1.model)("Station", stationSchema);
