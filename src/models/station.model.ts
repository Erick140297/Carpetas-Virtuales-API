import { Schema, model } from "mongoose";
import Station from "../interfaces/station.interface";

const stationSchema = new Schema<Station>(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    zone: {
      type: String,
      required: true,
    },
    manager: {
      type: String,
      required: true,
    },
    supervisor: {
      type: String,
      required: true,
    },
    directory: [{ type: Schema.Types.ObjectId, ref: "Folder" }],
  },
  { timestamps: true, versionKey: false }
);

export default model("Station", stationSchema);
