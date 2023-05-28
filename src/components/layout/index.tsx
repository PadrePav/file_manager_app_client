import React from 'react';
import {AppBar, Box, Toolbar} from "@mui/material";
import {Link, Outlet} from "react-router-dom";

const Layout = () => {
  const style = {
    textDecoration: 'none',
    color: '#ffffff'
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary" sx={{padding: 0}}>
          <Toolbar sx={{justifyContent: 'space-between', padding: 0}}>
            <Link to={'/user/root'} style={style}>My space</Link>
            <Toolbar style={{justifyContent: 'space-between', padding: 0}}>
              <Link to={'/sign-in'} style={style} onClick={() => {
                sessionStorage.removeItem('userName')
                sessionStorage.removeItem('token')
              }}>
                Log out
              </Link>
            </Toolbar>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet/>

    </>
  );
};

export default Layout;