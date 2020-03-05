// Import the wrapper component, and the the creator function
import React  from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';
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
      main: '#0d47a1',
    },
    secondary: {
      main: '#8411A8',
    },
    background: '#fff',
  },
  typography: {
    fontFamily: "Open Sans, Roboto, sans-serif"
  },
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