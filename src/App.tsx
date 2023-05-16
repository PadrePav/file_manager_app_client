import React from 'react';
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./utils/router/privateRoute";
import AuthRootComponent from "./components/auth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path='/' element={<h1>Home page</h1>}/>
        </Route>
        <Route path='sign-up' element={<AuthRootComponent/>}/>
        <Route path='sign-in' element={<AuthRootComponent/>}/>

      </Routes>
    </div>
  );
}

export default App;
