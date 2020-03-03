import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import BankCarousel from '../BankCarousel';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import {withRouter} from 'react-router-dom';



class Home extends Component {
  
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
    
   
    <Box bgcolor="primary.light" pt={"1.5em"} pb={"1.5em"} pl={"1em"} pr={"1em"}>
    <Container maxWidth="md">

      <Grid item justify="center" alignContent="center" xs={12}>
          <p style={{"font-size": "1.5em", "color": "white", "text-align": "center"}}>Najhitrejša pot do kredita <br/>
          po <strong>Vaši meri</strong>!</p>
      </Grid>

      <Grid item justify="center" alignContent="center" xs={12}>
          <p style={{"font-size": "2em", "color": "white", "text-align": "center",
        "line-height": "1.2em"}}>V <strong>manj kot minuti</strong> za Vas brezplačno poiščemo najugodnejšo ponudbo kredita</p>
      </Grid>
      

      <Grid container maxWidth="md" item justify="center" xs={12}>
            <Button variant="contained" color="secondary" onClick={() => this.nextPath("/izracun-kredita")}>
              <span style={{"font-size": "1.3em"}}><strong>Pridobi informativni izračun</strong></span>
            </Button>
      </Grid>
    </Container>  

    </Box>

    <Container maxWidth="md">
      <Box pt={"3em"}>
          <Grid container justify="center" xs={12}>
            <BankCarousel/>
          </Grid>    
      </Box>
    </Container>

    </div>
    )};

}

export default withRouter(Home);

