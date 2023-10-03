import fileModel from "../models/file.model";
import folderModel from "../models/folder.model";
import { deleteFileS3, getFileURL } from "../libs/s3";

const returnFile = async (fileId: string) => {
  const fileData = await fileModel.findById(fileId);
  const URL = await getFileURL(fileData!.key);
  return URL;
};

const insertFile = async (folderId: string, name: string, key: string) => {
  const folder = await folderModel.findById(folderId);
  if (!folder) {
    throw new Error("Folder not found");
  } else {
    const newFile = await fileModel.create({
      name,
      key,
      date: new Date(),
    });

    folder.files.push(newFile);
    const response = await folder.save();

    return response;
  }
};

const renameFile = async (id: string, name: string) => {
  const fileFound = await fileModel.findByIdAndUpdate(
    id,
    { name },
    {
      new: true,
    }
  );
  if (!fileFound) {
    throw new Error("File not found");
  }
  return fileFound;
};

const updateStatusFile = async (id: string, status: string) => {
  const fileFound = await fileModel.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
    }
  );
  if (!fileFound) {
    throw new Error("File not found");
  }
  return fileFound;
};

const addObservationsFile = async (id: string, observations: string) => {
  const fileFound = await fileModel.findByIdAndUpdate(
    id,
    { observations },
    {
      new: true,
    }
  );
  if (!fileFound) {
    throw new Error("File not found");
  }
  return fileFound;
};

const removeFile = async (fileId: string) => {
  const file = await fileModel.findByIdAndDelete(fileId);
  if (!file) {
    throw new Error("File not found");
  } else {
    await deleteFileS3(file.key);
    const foldersContainingFile = await folderModel.find({ files: fileId });
    await Promise.all(
      foldersContainingFile.map(async (folder) => {
        folder.files = folder.files.filter(
          (file) => file.toString() !== fileId
        );
        await folder.save();
      })
    );
  }
  return "File deleted successfully";
};

export {
  returnFile,
  insertFile,
  renameFile,
  updateStatusFile,
  removeFile,
  addObservationsFile,
};
