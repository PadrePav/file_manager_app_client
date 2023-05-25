import React from 'react';
import { Button, Dialog, DialogActions, DialogTitle, TextField} from "@mui/material";
import {IFolderDialogProps} from "../../../../common/types/home.page/drop.action/dialogs";

  const FolderDialog = (props: IFolderDialogProps) => {
  const {setAnchorEl, setFolderName , isDialogOpen, setDialogOpen} = props
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
        <DialogTitle textAlign='center'>New folder</DialogTitle>
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
                handleClose()
              }}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              onClick={() => {
                setDialogOpen(false)
                handleClose()
              }}
            >
              Create
            </Button>
          </form>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FolderDialog;