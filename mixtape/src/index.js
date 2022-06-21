import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#62BCB3',
      contrastText: '#E2E2DF',
      dark: '#62BCB3',
    },
    secondary: {
      main: '#FC9545',
      contrastText: '#E2E2DF',
    },
    background: {
      default: '#373433',
      paper: '#55504E',
    },
    error: {
      main: '#F21B18',
      dark: '#F21B18',
      contrastText: '#E2E2DF',
    },
    text: {
      primary: '#E2E2DF',
      secondary: '#E2E2DF',
      disabled: '#4D636D',
      hint: '#8F4F6A',
    },
    warning: {
      main: '#E165B2',
      contrastText: '#E2E2DF',
    },
    info: {
      main: '#707AFF',
      contrastText: '#E2E2DF',
    },
    success: {
      main: 'rgb(51, 214, 200)',
      dark: 'rgb(51, 214, 200)',
      contrastText: '#E2E2DF',
    },
    divider: '#E2E2DF',
  },
  typography: {
    fontFamily: 'Poppins',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 600,
    },
    subtitle2: {
      fontWeight: 500,
    },
    fontWeightRegular: 600,
    fontWeightLight: 400,
    button: {
      fontWeight: 600,
    },
    body2: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
