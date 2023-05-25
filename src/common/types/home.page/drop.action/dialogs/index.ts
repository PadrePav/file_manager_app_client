export interface IFolderDialogProps {
  setAnchorEl: (value: null | HTMLElement) => void;
  setFolderName: (folderName: string) => void;
  setDialogOpen: (value: boolean) => void;
  isDialogOpen: boolean
}

export interface IFileDialogProps {
  setAnchorEl: (value: null | HTMLElement) => void;
  setDialogOpen: (value: boolean) => void;
  isDialogOpen: boolean
}