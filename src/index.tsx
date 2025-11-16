import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {Header, Footer} from "./HeaderAndFooter/index.tsx"

import IndexPage from './IndexPage/index.tsx';
import AboutPage from './About/index.tsx';

import SignupPage from './Signup/index.tsx';
import AskingInfoPage from './AskingInfo/index.tsx';

import LoginPage from "./Login/index.tsx"

import AccountMain from './Account_main/index.tsx';
import AccountCalendar from './Account_schedule/index.tsx';

import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AccountBook from './Account_book/index.tsx';
import AccountSession from './Account_session/index.tsx';

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

        <Route path="/account_main"        element={<AccountMain />} />
        <Route path="/account_calendar"    element={<AccountCalendar />} />
        <Route path="/account_book"        element={<AccountBook />} />
        <Route path="/account_session"        element={<AccountSession />} />
      </Routes>
    </Router>
);
