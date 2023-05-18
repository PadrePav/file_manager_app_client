import React from 'react';
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./utils/router/privateRoute";
import AuthRootComponent from "./components/auth";
import HomePage from "./components/home.page";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path='/' element={<HomePage/>}/>
        </Route>
        <Route path='sign-up' element={<AuthRootComponent/>}/>
        <Route path='sign-in' element={<AuthRootComponent/>}/>

      </Routes>
    </div>
  );
}

export default App;
