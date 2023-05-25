import React from 'react';
import {Breadcrumbs, Typography} from "@mui/material";
import {useLocation, Link} from "react-router-dom";
import {useCrumbs} from "../../../utils/hook";


const MyBreadcrumbs = () => {
  const location = useLocation();
  const {isLoading, data} = useCrumbs(location.pathname);


  const crumbs = data.map((crumb, index) => {
    return (
       index !== data.length - 1 ?
         <Link key={index} to={crumb.path} style={{textDecoration: 'none', color: '#1976d2'}}>{crumb.folderName}</Link> :
         <Typography key={index}>{crumb.folderName}</Typography>
      )
  });

  return (
    <>
      <Breadcrumbs>
        {!isLoading && crumbs}
      </Breadcrumbs>
    </>
  );
};

export default MyBreadcrumbs;