import Folder from "./folder.interface";

export default interface Station {
  name: string;
  address: string;
  zone: string;
  manager: string;
  supervisor: string;
  directory: Folder[];
}
