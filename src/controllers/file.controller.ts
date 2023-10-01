import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import fs from "fs-extra";
import { v4 as uuidv4 } from "uuid";
import { handleHttp } from "../utils/error.handle";
import { uploadFile } from "../libs/s3";
import {
  returnFile,
  insertFile,
  removeFile,
  renameFile,
  updateStatusFile,
} from "../services/file.service";

const getFile = async (req: Request, res: Response) => {
  try {
    const { fileId } = req.params;
    const response = await returnFile(fileId);
    res.status(200).send({ URL: response });
  } catch (error) {
    handleHttp(res, "ERROR_GET_FILE", error);
  }
};

const postFile = async (req: Request, res: Response) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    const { folderId } = req.params;
    const { name } = req.body;

    const uniqueId: string = uuidv4();
    const key: string = name + "-" + uniqueId;
    const uploadedFile = req.files!.file as UploadedFile;

    await uploadFile(uploadedFile, key);
    await fs.unlink(uploadedFile.tempFilePath);

    const response = await insertFile(folderId, name, key);
    res.status(200).send(response);
  } catch (error) {
    handleHttp(res, "ERROR_POST_FILE", error);
  }
};

const postFiles = async (req: Request, res: Response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No se han subido archivos.");
  }

  const folderId = req.params.folderId;

  const uploadedFiles = req.files as {
    [fieldname: string]: UploadedFile;
  };

  try {
    const uploadPromises = Object.keys(uploadedFiles).map(async (fileKey) => {
      const file = uploadedFiles[fileKey];
      const key: string = file.name + "-" + uuidv4();

      await uploadFile(file, key);
      await fs.unlink(file.tempFilePath);

      const response = await insertFile(folderId, file.name, key);
      return response;
    });

    await Promise.all(uploadPromises);
    res.status(200).send("Archivos subidos exitosamente.");
  } catch (error) {
    handleHttp(res, "ERROR_POST_FILES", error);
  }
};

const putFile = async (req: Request, res: Response) => {
  try {
    const { fileId } = req.params;
    const { newName, status } = req.body;
    const response = await renameFile(fileId, newName);
    res.status(200).send(response);
  } catch (error) {
    handleHttp(res, "ERROR_UPDATE_FILE", error);
  }
};

const changeStatusFile = async (req: Request, res: Response) => {
  try {
    const { fileId } = req.params;
    const { status } = req.body;
    const response = await updateStatusFile(fileId, status);
    res.status(200).send(response);
  } catch (error) {
    handleHttp(res, "ERROR_UPDATE_FILE", error);
  }
};

const deleteFile = async (req: Request, res: Response) => {
  try {
    const { fileId } = req.params;
    const response = await removeFile(fileId);
    res.status(200).send(response);
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_FILE", error);
  }
};

export { getFile, postFile, postFiles, putFile, changeStatusFile, deleteFile };
