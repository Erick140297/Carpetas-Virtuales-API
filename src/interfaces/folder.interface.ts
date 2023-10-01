import { File }  from "./file.interface";

export default interface Folder {
  folderName: string;
  subFolders?: Folder[];
  files: File[];
  subFolder: boolean;
}
