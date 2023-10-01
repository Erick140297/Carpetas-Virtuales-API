"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const file_interface_1 = require("../interfaces/file.interface");
const fileSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    reviewedBy: { type: String },
    observations: { type: String },
    key: { type: String, required: true },
    status: {
        type: String,
        required: true,
        default: file_interface_1.Status.PENDING,
    },
}, { timestamps: true, versionKey: false });
exports.default = (0, mongoose_1.model)("File", fileSchema);
