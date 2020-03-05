import React, { Component }  from 'react';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import CookieConsent from "react-cookie-consent";
import { Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
//import FinsterLogo from './resources/logo-gray.png';
import FinsterLogoBlack from './resources/logo-black.png';
import AppRouter from './AppRouter';

class Layout extends Component{

    render() {
        return (

            // NAVBAR
            <div>
            

            <Box pt={"1em"} pb={"1em"} pl={"1em"} pr={"1em"}>
            <Container maxWidth='md' direction="row-reverse">

            <Grid  item xs={3} md={0}>
            </Grid>


            {/* MOBILE MENU */}
            <Grid item justify-xs-center xs={12}>
                   
                    <Link to="/" replace>
                    <img src={FinsterLogoBlack} alt="Logo - finster"
                     style={{"height": "2.3em"}}/>
                    </Link>

            </Grid>

            <Grid container item justify-xs-center xs={12}>
                   
                    <span style={{"color": "#212121"}}>Najhitrejša pot do kredita po vaši meri</span>

            </Grid>

            </Container>

            </Box>

            <AppRouter/>
            
            {/*}
            <Box mt={"2em"} bgcolor="#212121">
                <Container maxWidth="md">
                    
                    <Grid container>
                        
                        <Grid item xs={12}>
                            <h3 style={{"color": "#fff"}}>Copyright©2020 | Finster</h3>
                        </Grid>

                    </Grid>
                
                </Container>
        </Box>*/}

            
            <CookieConsent
                buttonText="Naprej"
                debug={true}>
                Ta stran uporablja piškotke. Z nadaljevanjem uporabe te strani soglašate z uporabo piškotkov.
            </CookieConsent>
           
            </div>
                
        )
    }
}
    
export default Layout;