import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Details from './components/Details';
import SearchBar from './components/SearchBar';
import Form from './components/Form'



function App() {

  return (
    <div className="App">
      <Route exact path={'/'} component={LandingPage} />
      <Route exact path={'/home'} component={Home} />
      <Route  path={'/videogame'} component={SearchBar} />
      <Route exact path={'/videogame/:id'} component={Details} />
      <Route exact path={'/create'} component={Form} />
    </div>
    
  );
}

export default App;
