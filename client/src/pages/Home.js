import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import BankCarousel from '../components/BankCarousel';
import PromoCarousel from '../components/PromoCarousel';
import { Grid, Typography } from '@material-ui/core';
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
    
   
    <Box pt={"1.5em"} pb={"1.5em"} pl={"1em"} pr={"1em"} bgcolor="#efefefe0">
    <Container  direction="row-reverse" maxWidth="md">
      
      <Grid container spacing={{ sm: 2, md: 4}} alignItems="center" justify="center">
        
        <Grid item justify="center" alignContent="center" xs={12} md={6}>
            <Typography variant="h4" align="center"> Prihranite čas in primerjajte informativne ponudbe vseh bank na enem mestu
              </Typography>
        </Grid>
        

        <Grid container maxWidth="md" item justify="center" xs={12}>
          <Box pt={"1.5em"}>
            <Button variant="contained" color="secondary" onClick={() => this.nextPath("/izracun-kredita")}>
              <Typography variant="button"><strong>Informativni izračuni</strong></Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>  

    </Box>

    <Container maxWidth="md">
      <Box pt={"1.5em"}>
          <Grid container justify="center" xs={12}>
            <BankCarousel/>
          </Grid>    
      </Box>
    </Container>


    <Container maxWidth="md">
     
        <Grid container spacing={5}>
          
          <Grid item xs={12} md={6}>
            <Box pt={"3em"}>
              <Typography variant="h4"><strong>Blog</strong></Typography>
              <Box pt={"1em"}/>
              <Typography variant="h4">Kakšen kredit naj izberem?</Typography>
              <Typography variant="caption">20 januar 2020</Typography>
              <Typography variant="body1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. I</Typography> 
            </Box>  
          </Grid>
         
          
            <Grid item xs={12} md={6}>
              <Box pt={"3em"}>
                <PromoCarousel/>
              </Box>
            </Grid>  
          
        </Grid>  
    </Container>
    </div>

    )};

}

export default withRouter(Home);

