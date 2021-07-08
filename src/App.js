import React from 'react';
import Header from './components/basics/Header';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './components/Main-page/Main.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (

    <BrowserRouter>
      <Header />
    <Main />
    </BrowserRouter>
  );
}

export default App;
