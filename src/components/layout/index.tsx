import React from 'react';
import {AppBar, Box, Toolbar} from "@mui/material";
import {Link, Outlet} from "react-router-dom";

const Layout = () => {

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary" sx={{padding: 0}}>
          <Toolbar sx={{justifyContent: 'space-between', padding: 0}}>
            <Link to={'/user/root'} style={{textDecoration: 'none', color: '#ffffff'}}>My space</Link>
            <Toolbar style={{width: '120px', justifyContent: 'space-between', padding: 0}}>
              <Link to={'/sign-in'} style={{textDecoration: 'none', color: '#ffffff'}}>Sign-in</Link>
              <Link to={'/sign-up'} style={{textDecoration: 'none', color: '#ffffff'}}>Sign-up</Link>
            </Toolbar>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet/>

    </>
  );
};

export default Layout;