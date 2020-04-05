import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import CalculatorPage from './Calculator/calculatorPage';
// import Home from './components/pages/Home';
import LandingPage from './LandingPage/landingPage';
import { withRouter } from "react-router";

function AppRouter(){

    return (
                    
        <Switch>
            <Route exact path="/izracun-kredita" render={() => <CalculatorPage key={Math.random()} />}/>
            <Route exact path="/" render={() =>  <LandingPage key={Math.random()} />}/>
        </Switch>

    )
}
export default withRouter(AppRouter);