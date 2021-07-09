import React from 'react';
import Header from './components/basics/Header.js';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './components/Main-page/Main.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/basics/Footer';


function App() {
  return (

    <BrowserRouter>
      <Header />
    <Main />
    
    <Footer />
    </BrowserRouter>
  );
}

export default App;
