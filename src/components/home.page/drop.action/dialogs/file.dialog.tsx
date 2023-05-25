import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogTitle, Input, TextField} from "@mui/material";
import {IFileDialogProps} from "../../../../common/types/home.page/drop.action/dialogs";
import {useAppDispatch, useFolderForm} from "../../../../utils/hook";
import {instance} from "../../../../utils/axios";
import {setStatusUpdate} from "../../../../store/slice/folderform";
import MySnackbar from "../../../snackbar";
import {useNavigate} from "react-router-dom";

const FileDialog = (props: IFileDialogProps) => {
  const [selectedFile, setSelectedFile] = useState<FileList | null>(null)
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(['']);
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token')
  const {setAnchorEl, isDialogOpen, setDialogOpen} = props
  const dispatch = useAppDispatch()
  const {folderId} = useFolderForm()

  const onUploadFile = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    try {
      if (!selectedFile) {
        return
      }
      const userName = sessionStorage.getItem('userName')
      const formData = new FormData()
      formData.append('file', selectedFile[0])
      await instance.post(`file/upload?userName=${userName}&parentFolderId=${folderId}`, formData, {headers: {Authorization: `Bearer ${token}`}})
      setDialogOpen(false)
      handleClose()
      dispatch(setStatusUpdate(true))
    } catch (e: any) {
      if (e.response.data.message === 'Unauthorized') {
        navigate('/sign-in')
      }
      setOpenSnackbar(true)
      setSnackbarMessage(e.response.data.message)
    }
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Dialog
        open={isDialogOpen} onClose={() => {
        setDialogOpen(false)
        handleClose()
      }}
      >
        <DialogTitle textAlign='center'>Upload file</DialogTitle>
        <TextField type='file' name='name' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSelectedFile(e.target.files)
        }}/>
        <DialogActions sx={{display: 'flex', justifyContent: 'center'}}>
          <form>
            <Button
              onClick={() => {
                setDialogOpen(false)
                handleClose()
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                onUploadFile(e)
              }}
            >
              Upload
            </Button>
          </form>
        </DialogActions>
        <MySnackbar state={openSnackbar} time={4000} snackbarMessage={snackbarMessage} setOpenSnackbar={setOpenSnackbar}/>
      </Dialog>
    </>
  );
};

export default FileDialog;