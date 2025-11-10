import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import IndexPage from './IndexPage';
import {Header} from "./OptionBar"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Header 
      options_left={["BKU tutor site"]} 
      options_right={["English", "Make an account", "Login", "About us"]}
    />
    <IndexPage />
  </React.StrictMode>
);
