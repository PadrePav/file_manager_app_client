import React from 'react';
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./utils/router/privateRoute";
import AuthRootComponent from "./components/auth";
import Layout from "./components/layout";
import HomePage from "./components/home.page";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path='/user' element={<Layout/>}>
            <Route path='*' element={<HomePage/>}/>
          </Route>
        </Route>
        <Route path='sign-up' element={<AuthRootComponent/>}/>
        <Route path='sign-in' element={<AuthRootComponent/>}/>
        <Route path='*' element={<div style={{display: 'flex', justifyContent: 'center',}}><h1>404 Not found</h1></div>}/>
      </Routes>
    </div>
  );
}

export default App;
