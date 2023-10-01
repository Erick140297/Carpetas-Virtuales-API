import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
  insertStation,
  returnStations,
  returnStation,
  updateStation,
  removeStation,
  returnStationsZone,
  returnStationName,
} from "../services/station.service";

const postStation = async ({ body }: Request, res: Response) => {
  try {
    const station = await insertStation(body);
    res.status(200).send(station);
  } catch (error) {
    handleHttp(res, "ERROR_POST_STATION", error);
  }
};

const getStation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await returnStation(id);
    res.status(200).send(response);
  } catch (error) {
    handleHttp(res, "ERROR_GET_STATION", error);
  }
};

const getStations = async (req: Request, res: Response) => {
  try {
    const stations = await returnStations();
    res.status(200).send(stations);
  } catch (error) {
    handleHttp(res, "ERROR_GET_STATIONS", error);
  }
};

const putStation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const response = await updateStation(id, body);
    res.status(200).send(response);
  } catch (error) {
    handleHttp(res, "ERROR_UPDATE_STATION", error);
  }
};

const deleteStation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await removeStation(id);
    res.status(200).send(response);
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_STATION", error);
  }
};


const getStationsZone = async (req: Request, res: Response) => {
  try {
    const { zone } = req.params;
    const response = await returnStationsZone(zone);
    res.status(200).send(response);
  }
   catch (error) {
    handleHttp(res, "ERROR_GET_STATIONS_ZONE", error);
  }
}

const getStationName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const response = await returnStationName(name);
    res.status(200).send(response);
  } catch (error) {
    handleHttp(res, "ERROR_GET_STATION_NAME", error);
  }
}

export { getStation, getStations, postStation, putStation, deleteStation, getStationsZone, getStationName };
