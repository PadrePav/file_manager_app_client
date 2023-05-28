import React, {JSX, useState} from 'react';
import {Divider, Grid, IconButton, ListItem, ListItemButton, ListItemIcon, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import {IFolder, IPropsFolder} from "../../../../common/types/home.page";
import {useNavigate} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import FolderChangeNameDialog from "../../drop.action/dialogs/folder.change.name.dialog";

const FolderList: React.FC<IPropsFolder> = (props: IPropsFolder): JSX.Element => {
  const {sourceFolder, setDeletedFolder} = props
  const navigate = useNavigate()
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [folderId, setFolderId] = useState('')
  const handleClick = (folderId: string) => {
    const result = window.confirm('Are you sure you want to delete this folder?');
    if (result) {
      setDeletedFolder(folderId);
    }
  }

  const date = (value: string) => {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
  <>
    <FolderChangeNameDialog isDialogOpen={isDialogOpen} setDialogOpen={setDialogOpen} folderId={folderId}/>
    {sourceFolder.folders?.map((folder: IFolder) => {

    return (
      <>
        <ListItem
          style={{padding: 0}}
          key={folder.id}
          secondaryAction={
            <>
              <IconButton onClick={() => {
                setDialogOpen(true)
                setFolderId(folder.id)
              }}>
                <EditIcon/>
              </IconButton>
              <IconButton style={{marginLeft: 0, marginRight: 15}} onClick={() => handleClick(folder.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }
          disableGutters
        >
          <ListItemButton
            onDoubleClick={() => {
              navigate(folder.path)
          }}>
            <Grid container spacing={3}>
              <Grid item xs={0.7}>
                <ListItemIcon style={{minWidth: 40, marginLeft: 5}}>
                  <FolderIcon/>
                </ListItemIcon>
              </Grid>
              <Grid item xs={5.5}>
                <Typography variant="subtitle1" component="h2">
                  {folder.name}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" component="h2">
                  {date(folder.created!.toString())}
                </Typography>
              </Grid>
            </Grid>
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