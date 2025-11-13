import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {Header, Footer} from "./HeaderAndFooter"

import IndexPage from './IndexPage';
import AboutPage from './About';
import SignupPage from './Signup';
import LoginPage from "./Login"
import AccountPage from './Account';
import AskingInfoPage from './AskingInfo';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function loadInit(){
  //scroll to top
  window.scrollTo(0, 0)
}

function __wrap__(children : React.ReactNode, type : string){
  return (
    <React.StrictMode>
      <div className='invi' onLoad={loadInit}></div>
      <Header 
        options_left={["BKU tutor site"]} 
        options_right={[
          "English", 
          type !== "signup" ? ["Make an account", "/signup"] : ["Login instead", "/login"], 
          type !== "main" ? ["Go back to main page", "/main"] : ["Login instead", "/login"],
          type === "about" ? ["Back to main page", "/"] : ["About us", "/about"]
        ]}
      />

      {children}

      <Footer 
        options_left={["Contact us:", "Email", "Facebook", "Github", "Linkin"]}
        options_right={[
          type === "about" ? ["Back to main page", "/"] : ["About us", "/about"],
          type !== "signup" ? ["Make an account", "/signup"] : ["Login instead", "/login"], 
          "MVP code link"
        ]}
      />
    </React.StrictMode>
  )
}

root.render(
  <Router>
      <Routes>
        <Route path="/"           element={__wrap__(<IndexPage />, "main")} />
        <Route path="/main"       element={__wrap__(<IndexPage />, "main")} />
        <Route path="/about"      element={__wrap__(<AboutPage />, "about")} />
        <Route path="/login"      element={__wrap__(<LoginPage />, "login")} />
        <Route path="/signup"     element={__wrap__(<SignupPage />, "signup")} />
        <Route path="/moreinfo"   element={__wrap__(<AskingInfoPage />, "signup")} /> 
        <Route path="/account"    element={<AccountPage />} />
      </Routes>
    </Router>
);
