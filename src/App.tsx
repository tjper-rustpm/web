import { Redirect, Route, Switch } from 'react-router-dom';

import SignIn from './containers/SignIn/SignIn';
import Servers from './containers/Servers/Servers';
import Profile from './containers/Profile/Profile';
import VerifyEmail from './containers/VerifyEmail/VerifyEmail';
import ForgotPassword from './containers/ForgotPassword/ForgotPassword';
import ChangePassword from './containers/ChangePassword/ChangePassword';

import { SignUp } from './pages/SignUp';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { light } from 'themes/light';

import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StylesProvider } from '@material-ui/core/styles';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider theme={light}>
        <StylesProvider injectFirst>
          <QueryClientProvider client={queryClient}>
            <Toaster position="bottom-center" reverseOrder={false} />
            <Header />
            <div className="bg-white pt-32">
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
                    <Servers />
                  </Route>
                  <Route path="*">
                    <Redirect to="/servers" />
                  </Route>
                </Switch>
              </div>
            </div>
            <Footer />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </StylesProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
