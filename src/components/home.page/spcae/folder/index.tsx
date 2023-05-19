import React from 'react';
import {Divider, IconButton, ListItem, ListItemButton, ListItemIcon, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import {IFolder, IPropsFolder} from "../../../../common/types/home.page";
import {useNavigate} from "react-router-dom";

const FolderList = (props: IPropsFolder) => {
  const {sourceFolder, setDeletedFolder} = props
  const navigate = useNavigate()
  const handleClick = (folderId: string) => {
    const result = window.confirm('Are you sure you want to delete this folder?');
    if (result) {
      setDeletedFolder(folderId);
    } else {
      console.log('Действие отменено');
    }
  }

  return (
  <>
    {sourceFolder.folders?.map((folder: IFolder, index: number) => {

    return (
      <>
        <ListItem
          key={index}
          secondaryAction={
            <IconButton style={{marginLeft: '20px'}} onClick={() => handleClick(folder.folderId)}>
              <DeleteIcon />
            </IconButton>
          }
          disableGutters
        >
          <ListItemButton onDoubleClick={() => navigate(`/user/folder/${folder.folderId}`)}>
            <ListItemIcon style={{minWidth: 40, marginLeft: 10}}>
              <FolderIcon/>
            </ListItemIcon>
            <Typography variant="subtitle1" component="h2">
              {folder.name}
            </Typography>
          </ListItemButton>
        </ListItem>
        <Divider />
      </>
    )
  })}
</>
)
};

export default FolderList;