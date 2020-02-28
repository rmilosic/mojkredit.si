// Import the wrapper component, and the the creator function
import React  from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';

import AppRouter from './AppRouter'
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";

// Create a new theme using Nunito Sans
const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, Roboto, sans-serif"
  },
  palette: {
    primary: green,
    secondary: amber,
  },
});

const Main = function(props) {
  // Pass the theme as a prop to the theme provider
  return (
    <MuiThemeProvider theme={theme}>
       <CssBaseline/>
        <AppRouter />
      
    </MuiThemeProvider>
  );
};

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
