import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Footer from './components/Footer/Footer';

import SignIn from './containers/SignIn/SignIn';
import SignUp from './containers/SignUp/SignUp';
import Servers from './containers/Servers/Servers';
import Profile from './containers/Profile/Profile';
import VerifyEmail from './containers/VerifyEmail/VerifyEmail';
import ForgotPassword from './containers/ForgotPassword/ForgotPassword';
import ChangePassword from './containers/ChangePassword/ChangePassword';

import Header from './components/Header/Header';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { light } from 'themes/light';

import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StylesProvider } from '@material-ui/core/styles';
import { Toaster } from 'react-hot-toast';

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
          <QueryClientProvider client={queryClient}>
            <Toaster position="bottom-center" reverseOrder={false} />
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
                  <Route path="/profile">
                    <Profile />
                  </Route>
                  <Route path="/verify-email">
                    <VerifyEmail />
                  </Route>
                  <Route path="/forgot-password">
                    <ForgotPassword />
                  </Route>
                  <Route path="/change-password">
                    <ChangePassword />
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
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </StylesProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
