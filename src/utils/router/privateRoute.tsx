import {Navigate, Outlet} from "react-router-dom";

const auth = false

const PrivateRoute = () => {
  return (
    auth ? <Outlet/> : <Navigate to={'sign-up'}/>
  );
};

export default PrivateRoute;