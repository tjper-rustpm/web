import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Footer from './components/Footer/Footer';

import Header from './containers/Header/Header';
import SignIn from './containers/SignIn/SignIn';
import SignUp from './containers/SignUp/SignUp';
import Servers from './containers/Servers/Servers';
import VerifyEmail from './containers/VerifyEmail/VerifyEmail';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { light } from 'themes/light';

import { QueryClient, QueryClientProvider } from 'react-query';
import { StylesProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

const Container = styled.div`
  background-color: ${(props): string => props.theme.colors.bravo};
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 10rem 0;
`;
const StyledFooter = styled(Footer)`
  margin-top: 6rem;
`;

const StyledServers = styled(Servers)`
  width: 97vw;
  margin: 0 auto;
`;

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider theme={light}>
        <StylesProvider injectFirst>
          <SnackbarProvider>
            <QueryClientProvider client={queryClient}>
              <Header />
              <Container>
                <div>
                  <Switch>
                    <Route path="/signup">
                      <SignUp />
                    </Route>
                    <Route path="/login">
                      <SignIn />
                    </Route>
                    <Route path="/verify-email">
                      <VerifyEmail />
                    </Route>
                    <Route path="/servers">
                      <StyledServers />
                    </Route>
                    <Route path="*">
                      <Redirect to="/servers" />
                    </Route>
                  </Switch>
                </div>
              </Container>
              <StyledFooter />
            </QueryClientProvider>
          </SnackbarProvider>
        </StylesProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
