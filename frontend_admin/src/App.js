// import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Hearder'
import { Outlet } from "react-router-dom";

import React from 'react';

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <div className="app-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}


export default App;