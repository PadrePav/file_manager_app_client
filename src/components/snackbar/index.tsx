import React, {JSX} from 'react';
import {Snackbar} from "@mui/material";
import {ISnackbar} from "../../common/types/auth";

const MySnackbar: React.FC<ISnackbar> = (props: ISnackbar): JSX.Element => {

  const {state, time, snackbarMessage, setOpenSnackbar} = props
  let margin = -55

  if (typeof snackbarMessage !== "string") {
    const snackbarList = snackbarMessage.map((message) => {
      margin += 55
      return (
        <>
          <Snackbar
            style={{marginBottom: `${margin}px`}}
            open={state}
            autoHideDuration={time}
            onClose={() => setOpenSnackbar(false)}
            message={`Error: ${message}`}
          />
        </>
      )
    });
    return (<div>{snackbarList}</div>);
  }
  return (
    <>
      <Snackbar
        open={state}
        autoHideDuration={time}
        onClose={() => setOpenSnackbar(false)}
        message={`Error: ${snackbarMessage}`}
      />
    </>
  )
};

export default MySnackbar;