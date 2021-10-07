import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ThemeProvider } from 'styled-components';
import { light } from 'themes/light';
import '@fontsource/oxanium';
import './index.css';

import { ApolloProvider } from '@apollo/client';
import client from './apollo/apollo';

import { StylesProvider } from '@material-ui/core/styles';

import { SnackbarProvider } from 'notistack';
import { UserServiceProvider } from './providers/User/User';
import { ServerServiceProvider } from './providers/Server/Server';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={light}>
        <ApolloProvider client={client}>
          <StylesProvider injectFirst>
            <SnackbarProvider>
              <UserServiceProvider>
                <ServerServiceProvider>
                  <App />
                </ServerServiceProvider>
              </UserServiceProvider>
            </SnackbarProvider>
          </StylesProvider>
        </ApolloProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
