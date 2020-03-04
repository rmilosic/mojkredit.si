// Import the wrapper component, and the the creator function
import React  from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Layout from './Layout';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import orange from '@material-ui/core/colors/orange';

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
      <Layout />
      </MuiThemeProvider>
      </div>
    
  );
};


ReactDOM.render(<Main/>, document.getElementById('root'));