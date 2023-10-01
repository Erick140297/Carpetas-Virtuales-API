"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFile = exports.updateStatusFile = exports.renameFile = exports.insertFile = exports.returnFile = void 0;
const file_model_1 = __importDefault(require("../models/file.model"));
const folder_model_1 = __importDefault(require("../models/folder.model"));
const s3_1 = require("../libs/s3");
const returnFile = (fileId) => __awaiter(void 0, void 0, void 0, function* () {
    const fileData = yield file_model_1.default.findById(fileId);
    const URL = yield (0, s3_1.getFileURL)(fileData.key);
    return URL;
});
exports.returnFile = returnFile;
const insertFile = (folderId, name, key) => __awaiter(void 0, void 0, void 0, function* () {
    const folder = yield folder_model_1.default.findById(folderId);
    if (!folder) {
        throw new Error("Folder not found");
    }
    else {
        const newFile = yield file_model_1.default.create({
            name,
            key,
            date: new Date(),
        });
        folder.files.push(newFile);
        const response = yield folder.save();
        return response;
    }
});
exports.insertFile = insertFile;
const renameFile = (id, name) => __awaiter(void 0, void 0, void 0, function* () {
    const fileFound = yield file_model_1.default.findByIdAndUpdate(id, { name }, {
        new: true,
    });
    if (!fileFound) {
        throw new Error("File not found");
    }
    return fileFound;
});
exports.renameFile = renameFile;
const updateStatusFile = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const fileFound = yield file_model_1.default.findByIdAndUpdate(id, { status }, {
        new: true,
    });
    if (!fileFound) {
        throw new Error("File not found");
    }
    return fileFound;
});
exports.updateStatusFile = updateStatusFile;
const removeFile = (fileId) => __awaiter(void 0, void 0, void 0, function* () {
    const file = yield file_model_1.default.findByIdAndDelete(fileId);
    if (!file) {
        throw new Error("File not found");
    }
    else {
        yield (0, s3_1.deleteFileS3)(file.key);
        const foldersContainingFile = yield folder_model_1.default.find({ files: fileId });
        yield Promise.all(foldersContainingFile.map((folder) => __awaiter(void 0, void 0, void 0, function* () {
            folder.files = folder.files.filter((file) => file.toString() !== fileId);
            yield folder.save();
        })));
    }
    return "File deleted successfully";
});
exports.removeFile = removeFile;
