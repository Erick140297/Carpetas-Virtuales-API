import { Schema, model } from "mongoose";
import Folder from "../interfaces/folder.interface";

const folderSchema = new Schema<Folder>(
  {
    folderName: { type: String, required: true },
    subFolders: [{ type: Schema.Types.ObjectId, ref: "Folder" }],
    files: [{ type: Schema.Types.ObjectId, ref: "File" }],
    subFolder: { type: Boolean, required: true, default: false}
  },
  { timestamps: true, versionKey: false }
);

export default model("Folder", folderSchema);
