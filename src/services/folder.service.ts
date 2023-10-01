import folderModel from "../models/folder.model";
import fileModel from "../models/file.model";
import stationModel from "../models/station.model";
import { deleteFileS3 } from "../libs/s3";

const returnFolder = async (folderId: string) => {
  const folder = await folderModel
    .findById(folderId)
    .populate("subFolders")
    .populate("files");
  if (!folder) {
    throw new Error("Folder not found");
  } else {
    return folder;
  }
};

const insertFolder = async (stationId: string, folderName: string) => {
  const station = await stationModel.findById(stationId);
  if (!station) {
    throw new Error("Station not found");
  } else {
    const newFolder = await folderModel.create({
      folderName,
      subFolders: [],
      files: [],
    });

    station.directory.push(newFolder);
    const response = await station.save();
    return response;
  }
};

const insertSubFolder = async (folderId: string, folderName: string) => {
  const folder = await folderModel.findById(folderId);
  if (!folder) {
    throw new Error("Folder not found");
  }

  const newFolder = await folderModel.create({
    folderName,
    subFolders: [],
    files: [],
    subFolder: true,
  });

  folder.subFolders?.push(newFolder);
  const response = await folder.save();

  return response;
};

const updateFolder = async (id: string, name: string) => {
  const folderFound = await folderModel.findByIdAndUpdate(
    id,
    { name },
    {
      new: true,
    }
  );
  if (!folderFound) {
    throw new Error("Folder not found");
  }
  return folderFound;
};

const deleteFolderAndContent = async (folderId: string) => {
  const folder = await folderModel.findById(folderId);

  if (!folder) {
    console.log("no se encontro folder");
    return;
  }

  if(!folder.subFolder) {
    const stationContainingFolder = await stationModel.find({ directory: folderId });
    await Promise.all(
      stationContainingFolder.map(async (station) => {
        station.directory = station.directory.filter((folder) => folder.toString() !== folderId);
        await station.save();
      })
    );
  } else {
    const folderContainingSubfolder = await folderModel.find({ subFolders: folderId });
    await Promise.all(
      folderContainingSubfolder.map(async (folder) => {
        folder.subFolders = folder.subFolders?.filter((folder) => folder.toString() !== folderId);
        await folder.save();
      })
    );
  }

  const deleteFileTasks = folder.files.map(async (fileId) => {
    const file = await fileModel.findByIdAndDelete(fileId);
    if(file){
      await deleteFileS3(file.key);
    }
  });

  await Promise.all(deleteFileTasks);

  if (folder.subFolders) {
    const deleteSubfolderTasks = folder.subFolders.map(async (subfolderId) => {
      await deleteFolderAndContent(subfolderId.toString());
    });

    await Promise.all(deleteSubfolderTasks);
  }
  await folderModel.findByIdAndDelete(folderId);
};

export {
  returnFolder,
  insertFolder,
  insertSubFolder,
  updateFolder,
  deleteFolderAndContent,
};
