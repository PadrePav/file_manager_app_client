import React from 'react';
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./utils/router/privateRoute";
import AuthRootComponent from "./components/auth";
import Layout from "./components/layout";
import Space from "./components/home.page/spcae";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path='/user' element={<Layout/>}>
            <Route path='/root' element={<Space/>}/>

          </Route>
        </Route>
        <Route path='sign-up' element={<AuthRootComponent/>}/>
        <Route path='sign-in' element={<AuthRootComponent/>}/>

      </Routes>
    </div>
  );
}

export default App;
