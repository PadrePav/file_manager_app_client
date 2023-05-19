import React from 'react';
import {AppBar} from "@mui/material";
import {Outlet} from "react-router-dom";

const Layout = () => {
  return (
    <>
      <AppBar position="static" color="primary" enableColorOnDark>
        File manager
      </AppBar>

      <Outlet/>

    </>
  );
};

export default Layout;