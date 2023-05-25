import React, {JSX, SyntheticEvent, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import './style.scss'
import SignUp from "./sign-up";
import SignIn from "./sign-in";
import {Box} from "@mui/material";
import {instance} from "../../utils/axios";
import {useAppDispatch} from "../../utils/hook";
import {login} from "../../store/slice/auth";

const AuthRootComponent: React.FC = (): JSX.Element => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(['']);


  const handleSubmit = async (e: SyntheticEvent) => {

    e.preventDefault()
    const userData = {
      userName,
      password
    }
    if (location.pathname === '/sign-up') {
      try {
        const newUser = await instance.post('auth/sign-up', userData)
        dispatch(login(newUser.data))
        navigate('/user/root')
        sessionStorage.setItem('userName', `${newUser.data.userName}`)
        sessionStorage.setItem('token', `${newUser.data.token}`)
      } catch (e: any) {
        setSnackbarMessage(e.response.data.message);
        setOpenSnackbar(true);
      }
    } else if (location.pathname === '/sign-in') {
      try {
        const {data} = await instance.post('auth/sign-in', userData)
        dispatch(login(data))
        sessionStorage.setItem('userName', `${data.userName}`)
        sessionStorage.setItem('token', `${data.token}`)
        navigate('/user/root')
      } catch (e: any) {
        setSnackbarMessage(e.response.data.message);
        setOpenSnackbar(true);
      }

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
            location.pathname === '/sign-up' ?
            <SignUp
              navigate={navigate}
              setUserName={setUserName}
              setPassword={setPassword}
              openSnackbar={openSnackbar}
              snackbarMessage={snackbarMessage}
              setOpenSnackbar={setOpenSnackbar}/> :
            location.pathname === '/sign-in' ?
            <SignIn
              navigate={navigate}
              setUserName={setUserName}
              setPassword={setPassword}
              openSnackbar={openSnackbar}
              snackbarMessage={snackbarMessage}
              setOpenSnackbar={setOpenSnackbar}/> :
              null
          }
        </Box>
      </form>
    </div>
  )
};

export default AuthRootComponent;