import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator';
import ErrorBoundry from '../error-boundry';
import {SwapiServiceProvider} from "../swapi-service-context";
import DummySwapiService from '../../services/dummy-swapi-service';
import { PeoplePage, StarshipsPage, PlanetsPage, LoginPage, SecretPage } from '../pages';
import {StarshipDetails, PersonDetails} from "../sw-components"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './app.css';

export default class App extends Component {

state = {
  hasError: false,
  swapiService: new SwapiService(),
  isLoggedIn: false
}

onLogin = () => {
  this.setState({isLoggedIn: true})
}

componentDidCatch() {
  this.setState({
      hasError: true
  });
}

onServiceChandge = () => {
  this.setState(({swapiService}) => {
    const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
    return {
      swapiService: new Service()
    }
  })
}

render() {

  const { isLoggedIn } = this.state;

  if (this.state.hasError) {
      return <ErrorIndicator />
  }

  return (
    <ErrorBoundry>
      <SwapiServiceProvider value={this.state.swapiService}>
        <Router>
            <div className="stardb-app">
              <Header 
              onServiceChandge={this.onServiceChandge}/>
              <RandomPlanet />
              <Routes>
                <Route exact path="/" element={<h2>Welcome to StarDB</h2>} />

                <Route path="/people" element={<PeoplePage />} >
                  <Route path=":id" element={<PersonDetails />} />
                </Route>
                <Route path="/planets" element={<PlanetsPage />} />
                <Route exact path="/starships" element={<StarshipsPage />} />
                <Route path="/starships/:id" element={<StarshipDetails />} />

                <Route path="/login" element={<LoginPage 
                                                  isLoggedIn={isLoggedIn} 
                                                  onLogin={this.onLogin}/>} />
                <Route path="/secret" element={<SecretPage isLoggedIn={isLoggedIn}/>} />
                <Route path='*' element={<p>Page not founded</p>} />

              </Routes>

            </div>
        </Router>
      </SwapiServiceProvider>
    </ErrorBoundry>
    );
}
};

