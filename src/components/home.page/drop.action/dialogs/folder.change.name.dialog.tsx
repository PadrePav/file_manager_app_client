import React, {useState} from 'react';
import { Button, Dialog, DialogActions, DialogTitle, TextField} from "@mui/material";
import {instance} from "../../../../utils/axios";
import MySnackbar from "../../../snackbar";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../../utils/hook";
import {setStatusUpdate} from "../../../../store/slice/folderform";

const FolderChangeNameDialog = (props: any) => {
  const {folderId, isDialogOpen, setDialogOpen} = props
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(['']);
  const [folderName, setFolderName] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChangeFolderName = async () => {
    try {
      const userName = sessionStorage.getItem('userName')
      const token = sessionStorage.getItem('token')
      const folderData = {
        folderName
      }
      await instance.patch(
        `folder/${folderId}?userName=${userName}`, folderData,
        { headers: { Authorization: `Bearer ${token}`}
        });
      dispatch(setStatusUpdate(true))
      setDialogOpen(false)
    } catch (e: any) {
      if (e.response.data.message === 'Unauthorized') {
        navigate('/sign-in')
      }
      setOpenSnackbar(true)
      setSnackbarMessage(e.response.data.message)
    }
  }

  return (
    <>
      <Dialog
        open={isDialogOpen} onClose={() => {
        setDialogOpen(false)
      }}
      >
        <DialogTitle textAlign='center'>Change name</DialogTitle>
        <TextField
          autoFocus
          id="name"
          label='folder name'
          variant={'filled'}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <DialogActions sx={{display: 'flex', justifyContent: 'center'}}>
          <form>
            <Button
              onClick={() => {
                setDialogOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleChangeFolderName()
              }}
            >
              Change
            </Button>
          </form>
        </DialogActions>
        <MySnackbar state={openSnackbar} time={4000} snackbarMessage={snackbarMessage} setOpenSnackbar={setOpenSnackbar}/>
      </Dialog>
    </>
  );
};

export default FolderChangeNameDialog;