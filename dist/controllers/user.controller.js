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
exports.resetPassword = exports.getSupervisores = exports.updatePassword = exports.authUser = exports.putUser = exports.deleteUser = exports.getUsers = exports.getUser = exports.postUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const error_handle_1 = require("../utils/error.handle");
const user_service_1 = require("../services/user.service");
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { name, lastName1, lastName2, email, post, zone, station } = req.body;
        const getInitials = (name) => {
            const nameSplit = name.split(" ");
            const initials = nameSplit.map((n) => n[0]).join("");
            return initials;
        };
        let password = "1234";
        const initials = getInitials(name);
        const userName = initials.replace(/\s+/g, "") + "-" + (0, uuid_1.v4)().slice(0, 4);
        const passwordHash = yield bcryptjs_1.default.hash(password, 10);
        const data = {
            name: name,
            lastName1: lastName1,
            lastName2: lastName2,
            userName: userName,
            email: email,
            password: passwordHash,
            post: post,
            zone: zone,
            station: station,
        };
        const user = yield (0, user_service_1.insertUser)(data);
        res.status(200).send(user);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_POST_USER", error);
    }
});
exports.postUser = postUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield (0, user_service_1.returnUser)(id);
        res.status(200).send(response);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_USER", error);
    }
});
exports.getUser = getUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, user_service_1.returnUsers)();
        res.status(200).send(response);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_USERS", error);
    }
});
exports.getUsers = getUsers;
const authUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        const result = yield (0, user_service_1.authService)(userName, password);
        res.status(200).json(result);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_AUTH", error);
    }
});
exports.authUser = authUser;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { password, newPassword } = req.body;
        const response = yield (0, user_service_1.updatePasswordService)(password, newPassword, id);
        return res.status(200).json({ message: response });
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_UPDATE_PASSWORD", error);
    }
});
exports.updatePassword = updatePassword;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const response = yield (0, user_service_1.updateUser)(id, body);
        res.status(200).send(response);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_UPDATE_USER", error);
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield (0, user_service_1.removeUser)(id);
        res.status(200).send({ message: response });
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_DELETE_USER", error);
    }
});
exports.deleteUser = deleteUser;
const getSupervisores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, user_service_1.returnSupervisores)();
        res.status(200).send(response);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_SUPERVISORES", error);
    }
});
exports.getSupervisores = getSupervisores;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const response = yield (0, user_service_1.resetPasswordService)(id);
        res.status(200).send(response);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_RESET_PASSWORD", error);
    }
});
exports.resetPassword = resetPassword;
