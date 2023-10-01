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
exports.returnStationName = exports.returnStationsZone = exports.removeStation = exports.updateStation = exports.returnStations = exports.returnStation = exports.insertStation = void 0;
const station_model_1 = __importDefault(require("../models/station.model"));
const insertStation = (station) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield station_model_1.default.create(station);
    return response;
});
exports.insertStation = insertStation;
const returnStation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield station_model_1.default.findById(id).populate("directory");
    return response;
});
exports.returnStation = returnStation;
const returnStations = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield station_model_1.default.find();
    return response;
});
exports.returnStations = returnStations;
const updateStation = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield station_model_1.default.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return response;
});
exports.updateStation = updateStation;
const removeStation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield station_model_1.default.findByIdAndRemove(id);
    return response;
});
exports.removeStation = removeStation;
const returnStationsZone = (zone) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield station_model_1.default.find({ zone: zone });
    return response;
});
exports.returnStationsZone = returnStationsZone;
const returnStationName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield station_model_1.default.find({ name: name }).populate("directory");
    return response[0];
});
exports.returnStationName = returnStationName;
