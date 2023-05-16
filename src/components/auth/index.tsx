import React, {SyntheticEvent, useState} from 'react';
import {useLocation} from "react-router-dom";
import './style.scss'
import SignUp from "./sign-up";
import SignIn from "./sign-in";
import {Box} from "@mui/material";

const AuthRootComponent = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    console.log(password)
    console.log(userName)
  }

  const location = useLocation();
  return (
    <div className='root'>
      <form className='form' onSubmit={handleSubmit}>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          maxWidth={400}
          margin='auto'
          padding={4}
          borderRadius={2}
          boxShadow={'2px 2px 10px #ccc'}
        >
          {location.pathname === '/sign-up' ? <SignUp setUserName={setUserName} setPassword={setPassword}/> : location.pathname === '/sign-in' ? <SignIn/> : null}
        </Box>
      </form>
    </div>
  )
};

export default AuthRootComponent;