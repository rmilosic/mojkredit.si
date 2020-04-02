// Import the wrapper component, and the the creator function
import React  from 'react';
import ReactDOM from 'react-dom';

// styles for bootstrap
import stackInterfaceCSS from './resources/css/stack-interface.css';
import iconsMindCSS from './resources/css/iconsmind.css';
import bootstrapCSS from './resources/css/bootstrap.css';
import themeCSS from './resources/css/theme.css';
import customCSS from './resources/css/custom.css';
import fontRalewayCSS from './resources/css/font-raleway.css';

// import scripts
import parallaxScript from './resources/js/parallax.js';
import smoothScrollScript from './resources/js/smooth-scroll.min.js';
import stackScripts from './resources/js/scripts.js';
import customScripts from './resources/js/custom.js';



import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Layout from './Layout';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {
  BrowserRouter as Router
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';
//import auth from './auth.ts'; // Sample authentication provider

const trackingId = "UA-159836417-1"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);
//ReactGA.set({
//  userId: auth.currentUserId(),
  // any data that is relevant to the user session
  // that you would like to track with google analytics
//})
//}

const history = createBrowserHistory();

// Initialize google analytics page view tracking
history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4a90e2',
    },
    secondary: {
      main: '#8411A8',
    },
    background: '#fff',
  },
  typography: {
    fontFamily: "Open Sans, Roboto, sans-serif"
  },
  overrides: {
    MuiMenuItem: {
      root: {
        background: '#fff',
      },
      selected: {
        background: '#fff',
      }
    },
    MuiExpansionPanel: {
      root: {
        background: 'white',
      }
    },
    MuiCardContent:{
      root: {
        background: 'white',
      }
    },
    MuiList: {
      root: {
        width: '100%'
      },
      padding: {
        paddingTop: 0,
        paddingBottom: 0
      }
    }
  }
});

const Main = function(props) {
  // Pass the theme as a prop to the theme provider
  return (

      <div>
      <CssBaseline/>
      <MuiThemeProvider theme={theme}>
        <Router history={history}>
          <Layout/>
        </Router>
      </MuiThemeProvider>
      </div>
    
  );
};


ReactDOM.render(<Main/>, document.getElementById('root'));