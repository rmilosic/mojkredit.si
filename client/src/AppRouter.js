import React, { Component }  from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import CalculatorPage from './components/pages/calculatorPage';
import App from './App';

class AppRouter extends Component{

    render() {
        return (
        
        <Router>
            
            <Switch>
                <Route exact path="/izracun-kredita" render={() => <CalculatorPage key={Math.random()} />}/>
                    
                <Route exact path="/" render={() =>  <App key={Math.random()} />}/>
                    
            </Switch>
    
        </Router>
        )
    }
}
    
export default AppRouter;