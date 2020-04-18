// Import the wrapper component, and the the creator function
import React  from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from "@material-ui/core/styles";
// import {
//   BrowserRouter as Router
// } from "react-router-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';


import Layout from './components/Layout';


require('typeface-montserrat');
// Theming
import {MyTheme} from './components/MyTheme.js';
import MyStyles from './resources/scss/app.scss';

// import scripts
import customScripts from './resources/js/custom.js';
// import bootstrapUtils from '../bootstrap-4.3.1/js/dist/util'


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


const Main = function(props) {
  // Pass the theme as a prop to the theme provider
  return (

      <div>
      {/* <CssBaseline/> */}
      <MuiThemeProvider theme={MyTheme}>
        <Router history={history}>
          <Layout/>
        </Router>
      </MuiThemeProvider>
      </div>
    
  );
};


ReactDOM.render(<Main/>, document.getElementById('root'));