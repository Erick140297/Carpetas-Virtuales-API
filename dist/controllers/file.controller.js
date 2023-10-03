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
exports.addObservations = exports.deleteFile = exports.changeStatusFile = exports.putFile = exports.postFiles = exports.postFile = exports.getFile = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const uuid_1 = require("uuid");
const error_handle_1 = require("../utils/error.handle");
const s3_1 = require("../libs/s3");
const file_service_1 = require("../services/file.service");
const getFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fileId } = req.params;
        const response = yield (0, file_service_1.returnFile)(fileId);
        res.status(200).send({ URL: response });
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_FILE", error);
    }
});
exports.getFile = getFile;
const postFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send("No files were uploaded.");
        }
        const { folderId } = req.params;
        const { name } = req.body;
        const uniqueId = (0, uuid_1.v4)();
        const key = name + "-" + uniqueId;
        const uploadedFile = req.files.file;
        yield (0, s3_1.uploadFile)(uploadedFile, key);
        yield fs_extra_1.default.unlink(uploadedFile.tempFilePath);
        const response = yield (0, file_service_1.insertFile)(folderId, name, key);
        res.status(200).send(response);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_POST_FILE", error);
    }
});
exports.postFile = postFile;
const postFiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No se han subido archivos.");
    }
    const folderId = req.params.folderId;
    const uploadedFiles = req.files;
    try {
        const uploadPromises = Object.keys(uploadedFiles).map((fileKey) => __awaiter(void 0, void 0, void 0, function* () {
            const file = uploadedFiles[fileKey];
            // Obtener la extensión del archivo
            const fileExtension = file.name.split(".").pop() || "";
            // Generar el nuevo nombre del archivo
            const newFileName = `${file.name.substring(0, file.name.lastIndexOf("."))}-${(0, uuid_1.v4)().substring(0, 4)}.${fileExtension}`;
            yield (0, s3_1.uploadFile)(file, newFileName);
            yield fs_extra_1.default.unlink(file.tempFilePath);
            const response = yield (0, file_service_1.insertFile)(folderId, file.name, newFileName);
            return response;
        }));
        yield Promise.all(uploadPromises);
        res.status(200).send("Archivos subidos exitosamente.");
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_POST_FILES", error);
    }
});
exports.postFiles = postFiles;
const putFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fileId } = req.params;
        const { newName, status } = req.body;
        const response = yield (0, file_service_1.renameFile)(fileId, newName);
        res.status(200).send(response);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_UPDATE_FILE", error);
    }
});
exports.putFile = putFile;
const changeStatusFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fileId } = req.params;
        const { status } = req.body;
        const response = yield (0, file_service_1.updateStatusFile)(fileId, status);
        res.status(200).send(response);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_UPDATE_FILE", error);
    }
});
exports.changeStatusFile = changeStatusFile;
const deleteFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fileId } = req.params;
        const response = yield (0, file_service_1.removeFile)(fileId);
        res.status(200).send(response);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_DELETE_FILE", error);
    }
});
exports.deleteFile = deleteFile;
const addObservations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fileId } = req.params;
        const { observations } = req.body;
        const response = yield (0, file_service_1.addObservationsFile)(fileId, observations);
        res.status(200).send(response);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_ADD_OBSERVATION_FILE", error);
    }
});
exports.addObservations = addObservations;
