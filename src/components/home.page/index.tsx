import React, {JSX, SyntheticEvent, useState} from 'react';
import RootSpace from "./spcae/root.space";
import {Route, Routes} from "react-router-dom";
import Space from "./spcae/space";
import {Box, Grid, Typography} from "@mui/material";
import MyBreadcrumbs from "./breadcrumbs";
import DropAction from "./drop.action";
import {useAppDispatch, useFolderForm} from "../../utils/hook";
import {instance} from "../../utils/axios";
import MySnackbar from "../snackbar";
import {setStatusUpdate} from "../../store/slice/folderform";
import DragAndDrop from "./drag.and.drop";

const HomePage: React.FC = (): JSX.Element => {
  const [folderName, setFolderName] = useState('')
  const {folderId} = useFolderForm()
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(['']);
  const dispatch = useAppDispatch()
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()
    const userName = sessionStorage.getItem('userName')
    const token = sessionStorage.getItem('token')
    const folder = {
      folderName
    }
    try {
      await instance.post(
        `folder/create?userName=${userName}&parentFolderId=${folderId}`, folder,
        { headers: { Authorization: `Bearer ${token}`}
        });
      dispatch(setStatusUpdate(true));
    } catch (e: any) {
      setOpenSnackbar(true);
      setSnackbarMessage(e.response.data.message);
    }
  }

  return (
    <>
      <Box
        position='absolute'
        top='5%'
        left='10%'
        right='10%'
        bottom='10%'
        display="flex"
      >
        <Box
          maxWidth='1050px'
          width='100%'
          margin='auto'
          height='80%'
          borderRadius={2}
          boxShadow={'2px 2px 5px #ccc'}
          overflow='auto'
        >
          <DragAndDrop>
            <form onSubmit={handleSubmit}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'warp',
                alignContent: 'centre',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '10px 15px 0 15px'
              }}
              >
                <MyBreadcrumbs/>
                <DropAction setFolderName={setFolderName}/>
              </Box>
            </form>
            <Grid container spacing={1} paddingLeft={8}>
              <Grid item xs={5.65}>
                <Typography variant='subtitle2'>Name</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='subtitle2'>Created</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant='subtitle2'>Size</Typography>
              </Grid>
            </Grid>
            <Routes>
              <Route path='root' element={<RootSpace/>}/>
              <Route path='folder/:id' element={<Space/>}/>
              <Route path='*' element={<div style={{display: 'flex', justifyContent: 'center',}}><h1>404 Not found</h1></div>}/>
            </Routes>
          </DragAndDrop>
        </Box>
        <MySnackbar state={openSnackbar} time={4000} snackbarMessage={snackbarMessage} setOpenSnackbar={setOpenSnackbar}/>
      </Box>
    </>
  );
};

export default HomePage;