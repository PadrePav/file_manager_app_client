import React from 'react';
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./utils/router/privateRoute";
import AuthRootComponent from "./components/auth";
import Layout from "./components/layout";
import RootSpace from "./components/home.page/spcae/root.space";
import Space from "./components/home.page/spcae/space";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path='/' element={<Layout/>}>
            <Route path='user/root' element={<RootSpace/>}/>
            <Route path='user/folder/:id' element={<Space/>}/>
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
