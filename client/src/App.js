import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Details from './components/Details';
import Form from './components/Form'
import Header from './components/Header';



function App() {

  return (
    <div className="App">
      <Route exact path={'/'} component={LandingPage} />
      <Route path={'/app'} component={Header} />
      <Route path ={'/app/home'} component={Home} />
      <Route exact path={'/app/videogame/:id'} component={Details} />
      <Route exact path={'/app/create'} component={Form} />
    </div>
    
  );
}

export default App;
