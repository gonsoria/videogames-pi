import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Details from './components/Details';
import Form from './components/Form'
import Header from './components/Header';
import ErrorPage from './components/ErrorPage';



function App() {
  return (
    <div className="App">
      <Route path={'/app'} component={Header} />
      <Switch>
        <Route exact path={'/'} component={LandingPage} />
        <Route exact path ={'/app/home'} component={Home} />
        <Route exact path={'/app/videogame/:id'} component={Details} />
        <Route exact path={'/app/create'} component={Form} />
        <Route path={'*'} component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default App;
