import { Router } from "express";
import {
  getStation,
  getStations,
  postStation,
  deleteStation,
  putStation,
  getStationsZone,
  getStationName,
} from "../controllers/station.controller";

const router = Router();

router.get("/get-station/:id", getStation);

router.get("/get-stations", getStations);

router.post("/post-station", postStation);

router.put("/put-station/:id", putStation);

router.delete("/delete-station/:id", deleteStation);

router.get("/get-stations-zone/:zone", getStationsZone);

router.get("/get-station-name/:name", getStationName);


export { router };
