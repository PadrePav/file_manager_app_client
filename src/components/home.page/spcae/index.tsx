import React, {useState} from 'react';
import {Box, List,} from "@mui/material";
import FolderList from "./folder";
import {useAppSelector, useUserFolder} from "../../../utils/hook";
import FileList from "./file";

const Space = () => {
  const {user} = useAppSelector(state => state.auth)
  const folder = useUserFolder('user/root', 'pavel')
  const [selectedFolder, setSelectedFolder] = useState('')
  const openFolder = useUserFolder('folder', selectedFolder)



  return (
    <Box
      position='absolute'
      top='5%'
      left='10%'
      right='10%'
      bottom='10%'
      display="flex"
    >
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
          <List sx={{width: '600px', maxWidth: 600, bgcolor: 'background.black'}}>
            <FolderList folder={folder.data} setSelectedFolder={setSelectedFolder}/>
            <FileList files={folder.data.files}/>
          </List> :
            <List sx={{width: '600px', maxWidth: 600, bgcolor: 'background.black'}}>
              <FolderList folder={openFolder!.data} setSelectedFolder={setSelectedFolder}/>
              <FileList files={openFolder!.data.files}/>
            </List> :
          <h1 style={{width: '400px'}}>loading</h1>}
      </Box>
    </Box>
  );
};

export default Space;