import { Router } from "express";
import {
  postFolder,
  postSubFolder,
  getFolder,
  putFolder,
  deleteFolder,
} from "../controllers/folder.controller";

const router = Router();

router.get("/get-folder/:folderId", getFolder);

router.post("/create-folder/:stationId", postFolder);

router.post("/create-subfolder/:folderId", postSubFolder);

router.put("/rename-folder/:folderId", putFolder);

router.delete("/delete-folder/:folderId", deleteFolder);

export { router };
