import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import BankCarousel from './components/BankCarousel';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import {withRouter} from 'react-router-dom';

import './index.css';


class App extends Component {
  
  constructor(props) {
    super(props)

    this.state = {}
    }

  nextPath(path) {
    this.props.history.push(path);
  }
  
  render() {

    return (
    <div>
    
    <Box bgcolor={"#145579"} pt={"1.5em"} pb={"2em"} pl={"1em"} pr={"1em"}>
      <Grid container direction="row-reverse">
          
          <Grid  item xs={3}>
          </Grid>

          <Grid container item justify="center" xs={6} >
            <img src={'./logo-gray.png'} alt="Logo - finster"
            style={{"height": "2.3em"}}/>
          </Grid>
     
         
      </Grid>

      <hr/>

      <Grid item justify="center" alignContent="center" xs={12}>
          <p style={{"font-size": "1.5em", "color": "white", "text-align": "center"}}>Najhitrejša pot do kredita <br/>
          po <strong>Vaši meri</strong>!</p>
      </Grid>

      <Grid item justify="center" alignContent="center" xs={12}>
          <p style={{"font-size": "2em", "color": "white", "text-align": "center",
        "line-height": "1.2em"}}>V <strong>manj kot minuti</strong> za Vas brezplačno poiščemo najugodnejšo ponudbo kredita</p>
      </Grid>
      

      <Grid container item justify="center" xs={12}>
            <Button variant="contained" color="secondary" onClick={() => this.nextPath("/izracun-kredita")}>
              <span style={{"font-size": "1.3em"}}><strong>Pridobi informativni izračun</strong></span>
            </Button>
      </Grid>
    </Box>

    <Box pt={"3em"}>
      <Grid container>
        <Grid item justify="center" xs={12}>
          <span style={{"text-align": "center", "font-size": "1.3em", "display": "block"}}><strong>Sodelujemo z bankami</strong></span>
        </Grid>
        
        <Grid item justify="center" xs={12}>
          <Box pt={"4em"}>
            {/*<BankCarousel/>*/}
          </Box>
        </Grid>
      
      </Grid>
    </Box>
    

    </div>
    )};

}

export default withRouter(App);

