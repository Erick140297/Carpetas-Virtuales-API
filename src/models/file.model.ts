import { Schema, model } from "mongoose";
import { Status, File } from "../interfaces/file.interface";

const fileSchema = new Schema<File>(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    reviewedBy: { type: String},
    observations:{ type: String},
    key: { type: String, required: true },
    status: {
      type: String,
      required: true,
      default: Status.PENDING,
    },
  },
  { timestamps: true, versionKey: false }
);

export default model("File", fileSchema);
