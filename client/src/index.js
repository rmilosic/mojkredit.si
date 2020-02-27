import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import CalculatorPage from './calculatorPage'
import './index.css';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';


class App extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {}
    }

  

  /*componentDidMount() {

  }*/



  
  render() {

    return (
    <div>
    <CssBaseline/>
    <Box bgcolor={"#145579"} pt={"1.5em"} pb={"2em"}>

      
      <Box>
      <Grid container direction="row-reverse">
          
          <Grid  item xs={3}>
          </Grid>

          <Grid container item justify="center" xs={6} >
            <img src={'./logo-gray.png'} alt="Logo - finster"
            style={{"height": "3em"}}/>
          </Grid>
     
         
      </Grid>
      </Box>

      <hr/>

      <Grid item justify="center" alignContent="center" xs={12}>
          <p style={{"font-size": "1.5em", "color": "white", "text-align": "center"}}>Najhitrejša pot do kredita <br/>
          po <strong>Vaši meri</strong>!</p>
      </Grid>

      <Grid item justify="center" alignContent="center" xs={12}>
          <p style={{"font-size": "2.3em", "color": "white", "text-align": "center"}}>V <strong>manj kot minuti</strong> za Vas brezplačno poiščemo najugodnejšo ponudbo kredita</p>
      </Grid>
      

      <Grid item justify="center" alignContent="center" xs={12}>
        <Box>
        <Router>
          <Link to="/izracun-kredita" style={{"text-decoration-line": "none", "display": "block", "text-align": "center"}}>
            <Button variant="contained" color="secondary">
              <span style={{"font-size": "1.3em"}}>Pridobi informativni izračun</span>
            </Button>
          </Link>
        </Router>
        </Box>
      </Grid>
      

    </Box>

      
      <Router>
        <Switch>
          <Route exact path="/izracun-kredita">
            <CalculatorPage />
          </Route>
        </Switch>
      </Router>
    </div>
    )};

}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


