// Import the wrapper component, and the the creator function
import React  from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from "@material-ui/core/styles";
import {
  BrowserRouter as Router
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';


import Layout from './Layout';

// styles for bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css';
// import stackInterfaceCSS from './resources/css/stack-interface.css';
// import iconsMindCSS from './resources/css/iconsmind.css';
// import bootstrapCSS from './resources/css/bootstrap.css';
// import themeCSS from './resources/css/theme.css';
// import customCSS from './resources/css/custom.css';
// import fontRalewayCSS from './resources/css/font-raleway.css';
import MyStles from './resources/scss/app.scss';

// Theming
import 'typeface-montserrat';
import MyTheme from './components/MyTheme';
// import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";

// import scripts
import customScripts from './resources/js/custom.js';


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