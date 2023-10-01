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
exports.deleteFolderAndContent = exports.updateFolder = exports.insertSubFolder = exports.insertFolder = exports.returnFolder = void 0;
const folder_model_1 = __importDefault(require("../models/folder.model"));
const file_model_1 = __importDefault(require("../models/file.model"));
const station_model_1 = __importDefault(require("../models/station.model"));
const s3_1 = require("../libs/s3");
const returnFolder = (folderId) => __awaiter(void 0, void 0, void 0, function* () {
    const folder = yield folder_model_1.default
        .findById(folderId)
        .populate("subFolders")
        .populate("files");
    if (!folder) {
        throw new Error("Folder not found");
    }
    else {
        return folder;
    }
});
exports.returnFolder = returnFolder;
const insertFolder = (stationId, folderName) => __awaiter(void 0, void 0, void 0, function* () {
    const station = yield station_model_1.default.findById(stationId);
    if (!station) {
        throw new Error("Station not found");
    }
    else {
        const newFolder = yield folder_model_1.default.create({
            folderName,
            subFolders: [],
            files: [],
        });
        station.directory.push(newFolder);
        const response = yield station.save();
        return response;
    }
});
exports.insertFolder = insertFolder;
const insertSubFolder = (folderId, folderName) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const folder = yield folder_model_1.default.findById(folderId);
    if (!folder) {
        throw new Error("Folder not found");
    }
    const newFolder = yield folder_model_1.default.create({
        folderName,
        subFolders: [],
        files: [],
        subFolder: true,
    });
    (_a = folder.subFolders) === null || _a === void 0 ? void 0 : _a.push(newFolder);
    const response = yield folder.save();
    return response;
});
exports.insertSubFolder = insertSubFolder;
const updateFolder = (id, name) => __awaiter(void 0, void 0, void 0, function* () {
    const folderFound = yield folder_model_1.default.findByIdAndUpdate(id, { name }, {
        new: true,
    });
    if (!folderFound) {
        throw new Error("Folder not found");
    }
    return folderFound;
});
exports.updateFolder = updateFolder;
const deleteFolderAndContent = (folderId) => __awaiter(void 0, void 0, void 0, function* () {
    const folder = yield folder_model_1.default.findById(folderId);
    if (!folder) {
        console.log("no se encontro folder");
        return;
    }
    if (!folder.subFolder) {
        const stationContainingFolder = yield station_model_1.default.find({ directory: folderId });
        yield Promise.all(stationContainingFolder.map((station) => __awaiter(void 0, void 0, void 0, function* () {
            station.directory = station.directory.filter((folder) => folder.toString() !== folderId);
            yield station.save();
        })));
    }
    else {
        const folderContainingSubfolder = yield folder_model_1.default.find({ subFolders: folderId });
        yield Promise.all(folderContainingSubfolder.map((folder) => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            folder.subFolders = (_b = folder.subFolders) === null || _b === void 0 ? void 0 : _b.filter((folder) => folder.toString() !== folderId);
            yield folder.save();
        })));
    }
    const deleteFileTasks = folder.files.map((fileId) => __awaiter(void 0, void 0, void 0, function* () {
        const file = yield file_model_1.default.findByIdAndDelete(fileId);
        if (file) {
            yield (0, s3_1.deleteFileS3)(file.key);
        }
    }));
    yield Promise.all(deleteFileTasks);
    if (folder.subFolders) {
        const deleteSubfolderTasks = folder.subFolders.map((subfolderId) => __awaiter(void 0, void 0, void 0, function* () {
            yield deleteFolderAndContent(subfolderId.toString());
        }));
        yield Promise.all(deleteSubfolderTasks);
    }
    yield folder_model_1.default.findByIdAndDelete(folderId);
});
exports.deleteFolderAndContent = deleteFolderAndContent;
