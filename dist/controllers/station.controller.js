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
exports.getStationName = exports.getStationsZone = exports.deleteStation = exports.putStation = exports.postStation = exports.getStations = exports.getStation = void 0;
const error_handle_1 = require("../utils/error.handle");
const station_service_1 = require("../services/station.service");
const postStation = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const station = yield (0, station_service_1.insertStation)(body);
        res.status(200).send(station);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_POST_STATION", error);
    }
});
exports.postStation = postStation;
const getStation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield (0, station_service_1.returnStation)(id);
        res.status(200).send(response);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_STATION", error);
    }
});
exports.getStation = getStation;
const getStations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stations = yield (0, station_service_1.returnStations)();
        res.status(200).send(stations);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_STATIONS", error);
    }
});
exports.getStations = getStations;
const putStation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const response = yield (0, station_service_1.updateStation)(id, body);
        res.status(200).send(response);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_UPDATE_STATION", error);
    }
});
exports.putStation = putStation;
const deleteStation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield (0, station_service_1.removeStation)(id);
        res.status(200).send(response);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_DELETE_STATION", error);
    }
});
exports.deleteStation = deleteStation;
const getStationsZone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { zone } = req.params;
        const response = yield (0, station_service_1.returnStationsZone)(zone);
        res.status(200).send(response);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_STATIONS_ZONE", error);
    }
});
exports.getStationsZone = getStationsZone;
const getStationName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const response = yield (0, station_service_1.returnStationName)(name);
        res.status(200).send(response);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_STATION_NAME", error);
    }
});
exports.getStationName = getStationName;
