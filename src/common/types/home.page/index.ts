export interface IPropsFolder {
  folder: IFolder;
  setSelectedFolder: (folderId: string) => void;
}

export interface IFolder {
  folderId: string;
  name: string;
  created: Date | null;
  parent_folder: IFolder | null;
  folders: IFolder[] | null;
  files: IFile[] | null;
}

export interface IPropsFile {
  files: IFile[] | null;
}

export interface IFile {
  fileId: string;
  name: string;
  uid: string;
  type: string;
  size: number;
  created: Date;
  parent_folder: IFolder
}