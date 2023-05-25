import React, {JSX, SyntheticEvent, useState} from 'react';
import {instance} from "../../../utils/axios";
import {useAppDispatch, useFolderForm} from "../../../utils/hook";
import MySnackbar from "../../snackbar";
import {setStatusUpdate} from "../../../store/slice/folderform";

const DragAndDrop: React.FC<any> = ({children}: any): JSX.Element => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(['']);
  const {folderId} = useFolderForm();
  const token = sessionStorage.getItem('token')
  const [drag, setDrag] = useState(false);
  const dispatch = useAppDispatch()
  const dragStartHandler = (e: SyntheticEvent) => {
    e.preventDefault()
    setDrag(true)
  }
  const dragLeaveHandler = (e: SyntheticEvent) => {
    e.preventDefault()
    setDrag(false)
  }
  const onDropHandler = async (e: React.DragEvent) => {
    e.preventDefault()
    try {
      if (!e?.dataTransfer?.files) {
        return
      }
      const userName = sessionStorage.getItem('userName')
      const files: File[] = Object.values(e.dataTransfer.files)

      for (const file of files) {
        const formData: FormData = new FormData()
        formData.append('file', file)
        await instance.post(`file/upload?userName=${userName}&parentFolderId=${folderId}`, formData, {headers: {Authorization: `Bearer ${token}`}})
      }
      dispatch(setStatusUpdate(true))
    } catch (e: any) {
      setOpenSnackbar(true)
      setSnackbarMessage(e.response.data.message)
    }
    setDrag(false)
  }

  return (
    <>
      {
        drag ?
          <div
            style={{height: '95%'}}
            onDragStart={e => dragStartHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragOver={e => dragStartHandler(e)}
            onDrop={e => onDropHandler(e)}
          >
            {children}
          </div> :
          <div
            style={{height: '95%'}}
            onDragStart={e => dragStartHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragOver={e => dragStartHandler(e)}
          >
            {children}
          </div>
      }
      <MySnackbar state={openSnackbar} time={4000} snackbarMessage={snackbarMessage} setOpenSnackbar={setOpenSnackbar}/>
    </>
  );
};

export default DragAndDrop;