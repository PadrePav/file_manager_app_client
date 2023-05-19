import React, {useState} from 'react';
import {Box, List} from "@mui/material";
import FolderList from "./folder";
import {useDeleteFolder, useUserFolder} from "../../../utils/hook";
import FileList from "./file";
import {useParams} from "react-router-dom";

const Space = () => {
  const {id} = useParams()
  const [deletedFolder, setDeletedFolder] = useState('')
  const deletedLoading = useDeleteFolder(deletedFolder)
  const folder = useUserFolder('folder', `${id}`, deletedLoading)



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
        maxWidth='600px'
        width='600px'
        margin='auto'
        height='80%'
        px={1}
        borderRadius={2}
        boxShadow={'2px 2px 5px #ccc'}
        overflow='auto'
      >
        {
          !folder.loading ?
          <List sx={{bgcolor: 'background.black'}}>
            <FolderList sourceFolder={folder.data} setDeletedFolder={setDeletedFolder}/>
            <FileList files={folder.data.files}/>
          </List> :
          null
        }
      </Box>
    </Box>
  );
};

export default Space;