import React, {JSX} from 'react';
import {Button, TextField, Typography} from "@mui/material";
import {IPropsAuth} from "../../../common/types/auth";

const SignIn: React.FC<IPropsAuth> = (props: IPropsAuth): JSX.Element => {
  const {setUserName, setPassword} = props

  return (
    <div>
      <>
        <Typography textAlign='center' variant="h5" >Sign in to your account</Typography>
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
        <Button
          type='submit'
          sx={{marginTop: 2, marginBottom: 2}}
          fullWidth={true}
          variant="contained"
        >
          Sign in
        </Button>
        <Typography textAlign='center' variant="body1" >
          Don't have an account?
          <span className='internalText'>
            Sign up
          </span>
        </Typography>
      </>
    </div>
  );
};

export default SignIn;