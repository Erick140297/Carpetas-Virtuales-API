import { Router } from "express";
import fileUpload from "express-fileupload";
import config from "../utils/fileUpload.config";
import {
  postFile,
  postFiles,
  getFile,
  putFile,
  changeStatusFile,
  deleteFile,
  addObservations,
} from "../controllers/file.controller";

const router = Router();

router.get("/download-file/:fileId", getFile);

router.post("/create-file/:folderId", fileUpload(config), postFile);

router.post("/upload-files/:folderId", fileUpload(config), postFiles);

router.put("/rename-file/:fileId", putFile);

router.put("/change-status/:fileId", changeStatusFile);

router.put("/add-observations/:fileId", addObservations);

router.delete("/delete-file/:fileId", deleteFile);

export { router };
