import React, { Component }  from 'react';
import CookieConsent from "react-cookie-consent";
import AppRouter from './AppRouter';

class Layout extends Component{

    render() {
        return (

            <div>
            
           
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