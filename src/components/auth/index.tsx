import React, {JSX, SyntheticEvent, useState} from 'react';
import {useLocation} from "react-router-dom";
import './style.scss'
import SignUp from "./sign-up";
import SignIn from "./sign-in";
import {Box} from "@mui/material";
import {instance} from "../../utils/axios";

const AuthRootComponent: React.FC = (): JSX.Element => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();


  const handleSubmit = async (e: SyntheticEvent) => {

    e.preventDefault()
    const userData = {
      userName,
      password
    }
    if (location.pathname === '/sign-up') {
      try {
        const user = await instance.post('auth/sign-up', userData)

      } catch (e: any) {
        console.log(JSON.parse(e.response.request.response).message)
      }
    } else if (location.pathname === '/sign-in') {
      const user = await instance.post('auth/sign-in', userData)
      console.log(user)

    }

  }
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
          {
            location.pathname === '/sign-up' ? <SignUp setUserName={setUserName} setPassword={setPassword}/> :
            location.pathname === '/sign-in' ? <SignIn setUserName={setUserName} setPassword={setPassword}/> : null
          }
        </Box>
      </form>
    </div>
  )
};

export default AuthRootComponent;