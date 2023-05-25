

export interface IPropsFolder {
  sourceFolder: IFolder;
  setDeletedFolder: (value: string) => void;
}

export interface IFolder {
  id: string;
  name: string;
  path: string
  created: Date | null;
  parent_folder: IFolder | null;
  folders: IFolder[] | null;
  files: IFile[] | null;
  owner: string | null;
}

export interface IPropsFile {
  files: IFile[] | null;
}

export interface IFile {
  id: string;
  name: string;
  uid: string;
  type: string;
  size: number;
  path: string
  created: Date;
  parent_folder: IFolder
  owner: string;
}