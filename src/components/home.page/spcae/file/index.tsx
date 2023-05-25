import React, {JSX, useState} from 'react';
import {
  Divider, Grid,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from '@mui/icons-material/Download';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {IFile, IPropsFile} from "../../../../common/types/home.page";
import {useAppDispatch, useDeleteFile} from "../../../../utils/hook";
import {instance} from "../../../../utils/axios";
import {setStatusUpdate} from "../../../../store/slice/folderform";
import {useNavigate} from "react-router-dom";

const FileList: React.FC<IPropsFile> = (props: IPropsFile): JSX.Element => {
  const {files} = props;
  const navigate = useNavigate()
  const [deleteFile, setDeleteFile] = useState('');
  const token = sessionStorage.getItem('token')
  useDeleteFile(deleteFile);
  const dispatch = useAppDispatch();
  const date = (value: string) => {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function humanFileSize(bytes: number, si=true, dp=1) {
    const thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
    const units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10**dp;
    do {
      bytes /= thresh;
      ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
    return bytes.toFixed(dp) + ' ' + units[u];
  }

  const handleDownload = async (fileId: string, fileName: string) => {
    try {
      const userName = sessionStorage.getItem('userName')
      const data = await instance.get(
        `file/download/${fileId}?userName=${userName}`,
        {
          responseType: 'blob', headers: {Authorization: `Bearer ${token}`
        }
      });
      const url = URL.createObjectURL(data.data);
      const anchor = document.createElement('a');
      anchor.href = url
      document.body.append(anchor);
      anchor.download = `${fileName}`
      anchor.click()
      anchor.remove()

      dispatch(setStatusUpdate(true));
    } catch (e: any) {
      if (e.response.data.message === 'Unauthorized') {
        navigate('/sign-in')
      }
    }
  }

  const handleDelete = (fileId: string) => {
    const result = window.confirm('Are you sure you want to delete this file?');
    if (result) {
      setDeleteFile(fileId);
    }
  }

  return (
    <>
      {files?.map((file: IFile) => {

        return (
          <>
            <ListItem
              style={{padding: 0}}
              key={file.name}
              secondaryAction={
                <>
                  <IconButton onClick={() => handleDownload(file.id, file.name + file.type)}>
                    <DownloadIcon/>
                  </IconButton>
                  <IconButton style={{marginLeft: 0, marginRight: 15}} onClick={() => handleDelete(file.id)}>
                    <DeleteIcon/>
                  </IconButton>
                </>
              }
              disableGutters
            >
              <ListItemButton>
                <Grid container spacing={3}>
                  <Grid item xs={0.7} md={0}>
                    <ListItemIcon style={{minWidth: 45}}>
                      <InsertDriveFileIcon/>
                    </ListItemIcon>
                  </Grid>
                  <Grid item xs={5.5}>
                    <Typography variant="subtitle1" component="h2" minWidth={180}>
                      {file.name + file.type}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1" component="h2">
                      {date(file.created.toString())}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="subtitle1" component="h2">
                      {`${humanFileSize(file.size)}`}
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

export default FileList;