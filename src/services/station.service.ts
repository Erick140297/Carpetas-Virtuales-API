import Station from "../interfaces/station.interface";
import stationModel from "../models/station.model";

const insertStation = async (station: Station) => {
  const response = await stationModel.create(station);
  return response;
};

const returnStation = async (id: string) => {
  const response = await stationModel.findById(id).populate("directory");
  return response;
};

const returnStations = async () => {
  const response = await stationModel.find();
  return response;
};

const updateStation = async (id: string, data: Station) => {
  const response = await stationModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return response;
};

const removeStation = async (id: string) => {
  const response = await stationModel.findByIdAndRemove(id);
  return response;
};

const returnStationsZone = async (zone: string) => {
  const response = await stationModel.find({zone: zone});
  return response;
}

const returnStationName = async (name: string) => {
  const response = await stationModel.find({name: name}).populate("directory");
  return response[0];
}

export {
  insertStation,
  returnStation,
  returnStations,
  updateStation,
  removeStation,
  returnStationsZone,
  returnStationName,
};
