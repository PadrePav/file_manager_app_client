import React, {useState} from 'react';
import {Box, Divider, List} from "@mui/material";
import FolderList from "./folder";
import {useAppDispatch, useDeleteFolder, useFolderForm, useUserFolder} from "../../../utils/hook";
import FileList from "./file";
import {setFolderId} from "../../../store/slice/folderform";

const RootSpace = () => {
  const [deletedFolder, setDeletedFolder] = useState('')
  useDeleteFolder(deletedFolder, setDeletedFolder)
  const {isStatusUpdated} = useFolderForm()
  const folder = useUserFolder(isStatusUpdated)
  const dispatch = useAppDispatch()
  const folderDrop = () => {
    dispatch(setFolderId(folder.data.id))
    return folder.data
  }


  return (
    <Box>
      {
        !folder.loading ?
          <List sx={{bgcolor: 'background.black'}} component="nav" aria-label="main mailbox folders">
            <Divider />
            <FolderList sourceFolder={folderDrop()} setDeletedFolder={setDeletedFolder}/>
            <FileList files={folder.data.files}/>
          </List> :
          null
      }
    </Box>
  );
};

export default RootSpace;