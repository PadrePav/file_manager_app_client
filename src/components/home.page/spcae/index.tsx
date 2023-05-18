import React, {useState} from 'react';
import {Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import FolderList from "./folder";
import {useAppSelector, useUserFolder} from "../../../utils/hook";
import {instance} from "../../../utils/axios";
import {IFolder} from "../../../common/types/home.page";

const Space = () => {
  const {user} = useAppSelector(state => state.auth)
  const folder = useUserFolder('user/root', 'pavel')
  const [selectedFolder, setSelectedFolder] = useState('')
  const openFolder = useUserFolder('folder', selectedFolder)



  return (
    <Box
      maxWidth={600}
      margin='auto'
      height='80%'
      px={1}
      borderRadius={2}
      boxShadow={'2px 2px 5px #ccc'}
      overflow='auto'
    >
      {!folder.loading ?
        !selectedFolder ?
        <List sx={{width: '450px', maxWidth: 400, bgcolor: 'background.black'}}>
          <FolderList folder={folder.data} setSelectedFolder={setSelectedFolder}/>
        </List> :
          <List sx={{width: '450px', maxWidth: 400, bgcolor: 'background.black'}}>
            <FolderList folder={openFolder!.data} setSelectedFolder={setSelectedFolder}/>
          </List> :
        <h1 style={{width: '400px'}}>loading</h1>}
    </Box>
  );
};

export default Space;