import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {RecoilRoot} from "recoil"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //Recoil 를 사용할려면 RecoilRoot를 감싸줘야한다
  <RecoilRoot>
    <App />
  </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
