import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { FaEnvelope, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { AuthProvider } from './context/AuthContext.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';

import {Header, Footer} from "./HeaderAndFooter/index.tsx"

import IndexPage from './IndexPage/index.tsx';
import AboutPage from './About/index.tsx';

import SignupPage from './Signup/index.tsx';
import AskingInfoPage from './AskingInfo/index.tsx';

import LoginPage from "./Login/index.tsx"

import AccountMain from './Account_main/index.tsx';
import AccountCalendar from './Account_schedule/index.tsx';
import AccountBook from './Account_book/index.tsx';
import AccountSession from './Account_session/index.tsx';
import AccountChat from './Account_chat/index.tsx';
import AccountDoc from './Account_doc/index.tsx';
import AccountForum from './Account_forum/index.tsx';
import AccountFeedback from './Account_feedback/index.tsx';
import AccountSetting from './Account_setting/index.tsx';

import MeetingRoom from './Meeting/index.tsx';

import { HashRouter as Router, Routes, Route } from "react-router-dom";

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
        options_left={[
          [<><img src="/PN1.png" alt="Logo" className="header-logo" /> HCMUT Tutor Platform</>, "/"]
        ]} 
        options_right={[
          type !== "signup" && type !== "login" ? ["Home", "/"] : null,
          type !== "signup" ? ["Sign Up", "/signup"] : ["Sign In", "/login"], 
          type !== "main" ? ["Home", "/main"] : ["Sign In", "/login"],
          type === "about" ? ["Home", "/"] : ["About", "/about"]
        ].filter(Boolean)}
      />

      {children}

      <Footer 
        options_left={[
          "Contact us:", 
          [<><FaEnvelope /> Email</>, "mailto:contact@bkututor.edu.vn"], 
          [<><FaFacebook /> Facebook</>, "https://facebook.com"], 
          [<><FaGithub /> Github</>, "https://github.com/NgocMinhUniversityProjects/MVP_CNPM"], 
          [<><FaLinkedin /> LinkedIn</>, "https://linkedin.com"]
        ]}
        options_right={[
          type === "about" ? ["Home", "/"] : ["About", "/about"],
          type !== "signup" ? ["Sign Up", "/signup"] : ["Sign In", "/login"], 
          ["View Source Code", "https://github.com/NgocMinhUniversityProjects/MVP_CNPM"]
        ]}
      />
    </React.StrictMode>
  )
}

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
      <Routes>
        <Route path="/"           element={__wrap__(<IndexPage />, "main")} />
        <Route path="/main"       element={__wrap__(<IndexPage />, "main")} />
        <Route path="/about"      element={__wrap__(<AboutPage />, "about")} />
        <Route path="/login"      element={__wrap__(<LoginPage />, "login")} />
        <Route path="/signup"     element={__wrap__(<SignupPage />, "signup")} />
        <Route path="/moreinfo"   element={__wrap__(<AskingInfoPage />, "signup")} /> 

        <Route path="/account"             element={<ProtectedRoute><AccountMain /></ProtectedRoute>} />
        <Route path="/account_main"        element={<ProtectedRoute><AccountMain /></ProtectedRoute>} />
        <Route path="/account_calendar"    element={<ProtectedRoute><AccountCalendar /></ProtectedRoute>} />
        <Route path="/account_book"        element={<ProtectedRoute><AccountBook /></ProtectedRoute>} />
        <Route path="/account_session"     element={<ProtectedRoute><AccountSession /></ProtectedRoute>} />
        <Route path="/account_chat"        element={<ProtectedRoute><AccountChat /></ProtectedRoute>} />
        <Route path="/account_mes"         element={<ProtectedRoute><AccountChat /></ProtectedRoute>} />
        <Route path="/account_doc"         element={<ProtectedRoute><AccountDoc /></ProtectedRoute>} />
        <Route path="/account_forum"       element={<ProtectedRoute><AccountForum /></ProtectedRoute>} />
        <Route path="/account_comunity"    element={<ProtectedRoute><AccountForum /></ProtectedRoute>} />
        <Route path="/account_feedback"    element={<ProtectedRoute><AccountFeedback /></ProtectedRoute>} />
        <Route path="/account_ac"          element={<ProtectedRoute><AccountSetting /></ProtectedRoute>} />

        <Route path="/meeting"            element={<ProtectedRoute><MeetingRoom /></ProtectedRoute>} />
      </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
