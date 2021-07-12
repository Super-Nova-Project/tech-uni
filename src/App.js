import React from 'react';
import Header from './components/basics/Header.js';
import Footer from './components/basics/Footer.js';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import './App.css';
import Main from './components/Main-page/Main.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './context/authContext';
import SignUp from './components/auth/SignUp';
import Create from './components/courses/create.js';
import Join from './components/courses/join.js';
import OneCourse from './components/courses/course';
import OneQuiz from './components/courses/quiz/quiz-page';

function App() {
  return (

    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Switch>
          <Route exact path="/signup">
            <SignUp/>
          </Route>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/create-course">
            <Create />
          </Route>
          <Route exact path="/join-course">
            <Join />
          </Route>
          <Route exact path="/course/:id">
            <OneCourse />
          </Route>
          <Route exact path="/course/:id/quiz/:quizID">
            <OneQuiz />
          </Route>
        </Switch>
       
      </AuthProvider> <Footer/>
    </BrowserRouter>
  );
}

export default App;
