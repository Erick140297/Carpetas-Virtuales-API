"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const station_controller_1 = require("../controllers/station.controller");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/get-station/:id", station_controller_1.getStation);
router.get("/get-stations", station_controller_1.getStations);
router.post("/post-station", station_controller_1.postStation);
router.put("/put-station/:id", station_controller_1.putStation);
router.delete("/delete-station/:id", station_controller_1.deleteStation);
router.get("/get-stations-zone/:zone", station_controller_1.getStationsZone);
router.get("/get-station-name/:name", station_controller_1.getStationName);