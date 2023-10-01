"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const folderSchema = new mongoose_1.Schema({
    folderName: { type: String, required: true },
    subFolders: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Folder" }],
    files: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "File" }],
    subFolder: { type: Boolean, required: true, default: false }
}, { timestamps: true, versionKey: false });
exports.default = (0, mongoose_1.model)("Folder", folderSchema);
