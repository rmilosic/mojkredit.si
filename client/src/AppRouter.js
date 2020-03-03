import React, {Component} from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import CalculatorPage from './components/pages/calculatorPage';
import Home from './components/pages/Home';
import { withRouter } from "react-router";

function AppRouter(){

    return (
                    
        <Switch>
            <Route exact path="/izracun-kredita" render={() => <CalculatorPage key={Math.random()} />}/>
            <Route exact path="/" render={() =>  <Home key={Math.random()} />}/>
        </Switch>

    )
}
export default withRouter(AppRouter);