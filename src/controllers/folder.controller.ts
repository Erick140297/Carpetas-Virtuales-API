import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
  returnFolder,
  insertFolder,
  insertSubFolder,
  updateFolder,
  deleteFolderAndContent,
} from "../services/folder.service";

const getFolder = async (req: Request, res: Response) => {
  try {
    const { folderId } = req.params;
    const response = await returnFolder(folderId);
    res.status(200).send(response);
  } catch (error) {
    handleHttp(res, "ERROR_GET_FOLDER", error);
  }
};

const postFolder = async (req: Request, res: Response) => {
  try {
    const { stationId } = req.params;
    const { folderName } = req.body;
    const response = await insertFolder(stationId, folderName);
    res.status(200).send(response);
  } catch (error) {
    handleHttp(res, "ERROR_POST_FOLDER", error);
  }
};

const postSubFolder = async (req: Request, res: Response) => {
  try {
    const { folderId } = req.params;
    const { folderName } = req.body;
    const response = await insertSubFolder(folderId, folderName);
    res.status(200).send(response);
  } catch (error) {
    handleHttp(res, "ERROR_POST_SUBFOLDER", error);
  }
};

const putFolder = async (req: Request, res: Response) => {
  try {
    const { folderId } = req.params;
    const { newName } = req.body;
    const response = await updateFolder(folderId, newName);
    res.status(200).send(response);
  } catch (error) {
    handleHttp(res, "ERROR_UPDATE_FOLDER", error);
  }
};

const deleteFolder = async (req: Request, res: Response) => {
  try {
    const { folderId } = req.params;
    await deleteFolderAndContent(folderId);
    res.status(200).send({message: "folder eliminado"});
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_FOLDER", error);
  }
};

export { getFolder, postFolder, postSubFolder, putFolder, deleteFolder };
