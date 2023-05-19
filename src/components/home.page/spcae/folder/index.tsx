import React from 'react';
import {IconButton, ListItem, ListItemButton, ListItemIcon, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import {IFolder, IPropsFolder} from "../../../../common/types/home.page";

const FolderList = (props: IPropsFolder) => {
  const {folder, setSelectedFolder} = props


  return (
  <>
    {folder.folders?.map((folder: IFolder, index: number) => {

    return (
        <ListItem
          key={index}
          secondaryAction={
            <IconButton style={{marginLeft: '20px'}}>
              <DeleteIcon/>
            </IconButton>
          }
          disableGutters
        >
          <ListItemButton onDoubleClick={() => setSelectedFolder(folder.folderId)}>
            <ListItemIcon style={{minWidth: 40, marginLeft: 10}}>
              <FolderIcon/>
            </ListItemIcon>
            <Typography variant="subtitle1" component="h2">
              {folder.name}
            </Typography>
          </ListItemButton>
        </ListItem>
    )
  })}
</>
)
};

export default FolderList;