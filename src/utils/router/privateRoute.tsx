import {Navigate, Outlet} from "react-router-dom";
// import jwt from 'jsonwebtoken'
//
// const isTokenValid = () => {
//   const token = sessionStorage.getItem('token')
//   if (!token) {
//     console.log(token, 'token')
//     return false
//   }
//   const decodedToken = jwt.decode(token, {complete: true})
//   const expirationToken = decodedToken?.header
//   console.log(decodedToken)
//   console.log(decodedToken?.header)
//   return true
// }
const PrivateRoute = () => {
  const auth = true
  return (
    auth ? <Outlet/> : <Navigate to={'sign-up'}/>
  );
};

export default PrivateRoute;