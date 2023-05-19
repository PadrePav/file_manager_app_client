import React from 'react';
import {Box, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {IFile, IPropsFile} from "../../../../common/types/home.page";

const FileList = (props: IPropsFile) => {
  const {files} = props
  const date = (value: string) => {
    const date = new Date(value)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`
  }

  return (
    <>
      {files?.map((file: IFile, index: number) => {

        return (
          <>
            <ListItem
              key={index}
              secondaryAction={
                <IconButton style={{marginLeft: '20px'}}>
                  <DeleteIcon/>
                </IconButton>
              }
              disableGutters
            >
              <ListItemButton>
                <ListItemIcon style={{minWidth: 40, marginLeft: 10}}>
                  <InsertDriveFileIcon/>
                </ListItemIcon>
                <Box justifyContent='space-between' display='flex' flexDirection='row' width='100%'>
                  <Typography variant="subtitle1" component="h2" minWidth={180}>
                    {file.name + file.type}
                  </Typography>
                  <Typography variant="subtitle1" component="h2">
                    {date(file.created.toString())}
                  </Typography>
                  <Typography variant="subtitle1" component="h2">
                    {`size: ${file.size}`}
                  </Typography>
                </Box>
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