"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const fileUpload_config_1 = __importDefault(require("../utils/fileUpload.config"));
const file_controller_1 = require("../controllers/file.controller");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/download-file/:fileId", file_controller_1.getFile);
router.post("/create-file/:folderId", (0, express_fileupload_1.default)(fileUpload_config_1.default), file_controller_1.postFile);
router.post("/upload-files/:folderId", (0, express_fileupload_1.default)(fileUpload_config_1.default), file_controller_1.postFiles);
router.put("/rename-file/:fileId", file_controller_1.putFile);
router.put("/change-status/:fileId", file_controller_1.changeStatusFile);
router.put("/add-observations/:fileId", file_controller_1.addObservations);
router.delete("/delete-file/:fileId", file_controller_1.deleteFile);
