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
exports.resetPasswordService = exports.returnSupervisores = exports.updatePasswordService = exports.authService = exports.removeUser = exports.updateUser = exports.returnUsers = exports.returnUser = exports.insertUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const insertUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const response = user_model_1.default.create(user);
    return response;
});
exports.insertUser = insertUser;
const returnUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = user_model_1.default.findById(id);
    return response;
});
exports.returnUser = returnUser;
const returnUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = user_model_1.default.find();
    return response;
});
exports.returnUsers = returnUsers;
const returnSupervisores = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = user_model_1.default.find({ post: "Supervisor" });
    return response;
});
exports.returnSupervisores = returnSupervisores;
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield user_model_1.default.findById(id);
    if (!userFound) {
        throw new Error("User not found");
    }
    for (const key in data) {
        switch (key) {
            case "name":
                userFound.name = data.name;
                break;
            case "lastName1":
                userFound.lastName1 = data.lastName1;
                break;
            case "lastName2":
                userFound.lastName2 = data.lastName2;
                break;
            case "email":
                userFound.email = data.email;
                break;
            case "post":
                userFound.post = data.post;
                break;
            case "zone":
                userFound.zone = data.zone;
                break;
            case "station":
                userFound.station = data.station;
                break;
        }
    }
    yield userFound.save();
    return "User updated successfully";
});
exports.updateUser = updateUser;
const removeUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield user_model_1.default.findByIdAndRemove(id);
    if (!response) {
        throw new Error("Error delete user");
    }
    return "User deleted successfully";
});
exports.removeUser = removeUser;
const authService = (userName, password) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield user_model_1.default.findOne({ userName });
    if (!userFound) {
        throw new Error("The username or password is incorrect");
    }
    const isMatch = yield bcryptjs_1.default.compare(password, userFound.password);
    if (!isMatch) {
        throw new Error("The username or password is incorrect");
    }
    const result = {
        id: userFound._id,
        name: userFound.name,
        userName: userFound.userName,
        post: userFound.post,
        zone: userFound.zone,
        station: userFound.station,
    };
    return result;
});
exports.authService = authService;
const resetPasswordService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        throw new Error("User id is required");
    }
    const userFound = yield user_model_1.default.findById(id);
    if (!userFound) {
        throw new Error("User not found");
    }
    let password = "1234";
    const newPasswordHash = yield bcryptjs_1.default.hash(password, 10);
    userFound.password = newPasswordHash;
    yield userFound.save();
    return "password updated successfully";
});
exports.resetPasswordService = resetPasswordService;
const updatePasswordService = (password, newPassword, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!password || !newPassword) {
        throw new Error("Both current and new passwords are required");
    }
    const userFound = yield user_model_1.default.findById(id);
    if (!userFound) {
        throw new Error("User not found or incorrect credentials");
    }
    const isMatch = yield bcryptjs_1.default.compare(password, userFound.password);
    if (!isMatch) {
        throw new Error("User not found or incorrect credentials");
    }
    const newPasswordHash = yield bcryptjs_1.default.hash(newPassword, 10);
    userFound.password = newPasswordHash;
    yield userFound.save();
    return "password updated successfully";
});
exports.updatePasswordService = updatePasswordService;
