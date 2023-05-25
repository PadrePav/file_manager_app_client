import React, {JSX, useState} from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {IDropAction} from "../../../common/types/home.page/drop.action";
import FolderDialog from "./dialogs/folder.dialog";
import FileDialog from "./dialogs/file.dialog";

const DropAction: React.FC<IDropAction> = (props: IDropAction): JSX.Element => {
  const {setFolderName} = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isDialogFolderOpen, setDialogFolderOpen] = useState(false)
  const [isDialogFileOpen, setDialogFileOpen] = useState(false)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleFolderForm = () => {
    setDialogFolderOpen(true)
  }
  const handleFileForm = () => {
    setDialogFileOpen(true)
  }


  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem  key={1} onClick={handleFolderForm}>
          add folder
        </MenuItem>
        <MenuItem  key={2} onClick={handleFileForm}>
          upload file
        </MenuItem>
        <FolderDialog
          setFolderName={setFolderName}
          setAnchorEl={setAnchorEl}
          isDialogOpen={isDialogFolderOpen}
          setDialogOpen={setDialogFolderOpen}
        />
        <FileDialog isDialogOpen={isDialogFileOpen} setDialogOpen={setDialogFileOpen} setAnchorEl={setAnchorEl}/>
      </Menu>
    </div>
  );
};

export default DropAction;