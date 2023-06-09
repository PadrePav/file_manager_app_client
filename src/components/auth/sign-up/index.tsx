import React, {JSX} from 'react';
import {Button, TextField, Typography} from "@mui/material";
import {IPropsAuth} from "../../../common/types/auth";
import MySnackbar from "../../snackbar";

const Signup: React.FC<IPropsAuth> = (props: IPropsAuth): JSX.Element => {
  const {setUserName, setPassword, navigate, openSnackbar, snackbarMessage, setOpenSnackbar} = props

  return (
    <>
      <Typography textAlign='center' variant="h5" >Create an account</Typography>
      <TextField
        fullWidth={true}
        margin='normal'
        label="Name"
        variant="outlined"
        placeholder={'Enter your name'}
        onChange={(e) => setUserName(e.target.value)}
      />
      <TextField
        type='password'
        fullWidth={true}
        margin='normal'
        label="Password"
        variant="outlined"
        placeholder={'Enter your password'}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type='submit' sx={{marginTop: 2, marginBottom: 2}} fullWidth={true} variant="contained">
        Create account
      </Button>
      <Typography textAlign='center' variant="body1" >
        Already have an account?
        <span onClick={() => navigate('/sign-in')} className='internalText'>
          Sign in
        </span>
      </Typography>
      <MySnackbar state={openSnackbar} time={5000} snackbarMessage={snackbarMessage} setOpenSnackbar={setOpenSnackbar} />
    </>
  );
};

export default Signup;