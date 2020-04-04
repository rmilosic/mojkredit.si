import React, { Component }  from 'react';
import CookieConsent from "react-cookie-consent";
import AppRouter from './AppRouter';

class Layout extends Component{

    render() {
        return (

            // NAVBAR
            <div>
            

            {/* <Box pt={"1em"} pb={"1em"} pl={"1em"} pr={"1em"}> */}
            {/* <Container maxWidth='md' direction="row-reverse"> */}

                {/* <Grid  item xs={3} md={0}>
                </Grid>


                <Grid item justify-xs-center xs={12}>
                    
                        <Link to="/" replace>
                        <img src={FinsterLogoBlack} alt="Logo - finster"
                        style={{"height": "2.3em"}}/>
                        </Link>

                </Grid>

                <Grid container item justify-xs-center xs={12}>
                    
                        <span style={{"color": "#212121"}}>Najhitrejša pot do kredita po vaši meri</span>

                </Grid> */}

                

            {/* </Container> */}
           
            <AppRouter/>
            

            
            <CookieConsent
                buttonText="Naprej">
                Ta stran uporablja piškotke. Z nadaljevanjem uporabe te strani soglašate z uporabo piškotkov.
            </CookieConsent>
           
            </div>
                
        )
    }
}
    
export default Layout;