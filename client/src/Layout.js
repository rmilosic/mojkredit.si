import React, { Component }  from 'react';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Box from '@material-ui/core/Box';
import FinsterLogo from './resources/logo-gray.png';
import AppRouter from './AppRouter';

class Layout extends Component{

    render() {
        return (

            // NAVBAR


            <div>
            <Router>

            <Box bgcolor="primary.main" pt={"1em"} pb={"1em"} pl={"1em"} pr={"1em"}>
            <Container maxWidth='md' direction="row-reverse">

            <Grid  item xs={3} md={0}>
            </Grid>


            {/* MOBILE MENU */}
            <Grid container item justify-xs-center xs={12}>
                
                    <Link to="/" replace>
                    <img src={FinsterLogo} alt="Logo - finster"
                     style={{"height": "2.3em"}}/>
                    </Link>
                
               
                                
                
            </Grid>


            </Container>

            </Box>

            <AppRouter/>
            </Router>
            </div>
                
        )
    }
}
    
export default Layout;