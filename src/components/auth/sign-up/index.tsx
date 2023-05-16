import React from 'react';
import {Button, TextField, Typography} from "@mui/material";

interface IAuth {
  setUserName:  React.Dispatch<React.SetStateAction<string>>
  setPassword:  React.Dispatch<React.SetStateAction<string>>
}

const Signup = (props: IAuth) => {
  const {setUserName, setPassword} = props

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
        <span className='internalText'>
          Sign in
        </span>
      </Typography>
    </>
  );
};

export default Signup;