import React, {useState} from 'react';
import {Box, List,} from "@mui/material";
import FolderList from "./folder";
import {useAppSelector, useUserFolder} from "../../../utils/hook";

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