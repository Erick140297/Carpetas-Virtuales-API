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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFolder = exports.putFolder = exports.postSubFolder = exports.postFolder = exports.getFolder = void 0;
const error_handle_1 = require("../utils/error.handle");
const folder_service_1 = require("../services/folder.service");
const getFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { folderId } = req.params;
        const response = yield (0, folder_service_1.returnFolder)(folderId);
        res.status(200).send(response);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_FOLDER", error);
    }
});
exports.getFolder = getFolder;
const postFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stationId } = req.params;
        const { folderName } = req.body;
        const response = yield (0, folder_service_1.insertFolder)(stationId, folderName);
        res.status(200).send(response);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_POST_FOLDER", error);
    }
});
exports.postFolder = postFolder;
const postSubFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { folderId } = req.params;
        const { folderName } = req.body;
        const response = yield (0, folder_service_1.insertSubFolder)(folderId, folderName);
        res.status(200).send(response);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_POST_SUBFOLDER", error);
    }
});
exports.postSubFolder = postSubFolder;
const putFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { folderId } = req.params;
        const { newName } = req.body;
        const response = yield (0, folder_service_1.updateFolder)(folderId, newName);
        res.status(200).send(response);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_UPDATE_FOLDER", error);
    }
});
exports.putFolder = putFolder;
const deleteFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { folderId } = req.params;
        yield (0, folder_service_1.deleteFolderAndContent)(folderId);
        res.status(200).send({ message: "folder eliminado" });
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_DELETE_FOLDER", error);
    }
});
exports.deleteFolder = deleteFolder;
