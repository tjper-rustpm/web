import { Redirect, Route, Switch } from 'react-router-dom';

import Servers from './containers/Servers/Servers';

import { ForgotPassword } from './pages/ForgotPassword';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { VerifyEmail } from './pages/VerifyEmail';
import { ResetPassword } from './pages/ResetPassword';
import { Profile } from './pages/Profile';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { Authenticated } from './router/Authenticated';

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
            <div className="flex flex-col h-screen justify-between">
              <div>
                <Header />
              </div>
              <div className="mb-auto pt-64 md:pt-48">
                <Switch>
                  <Route path="/signup">
                    <SignUp />
                  </Route>
                  <Route path="/login">
                    <SignIn />
                  </Route>
                  <Authenticated path="/profile">
                    <Profile />
                  </Authenticated>
                  <Route path="/verify-email">
                    <VerifyEmail />
                  </Route>
                  <Route path="/forgot-password">
                    <ForgotPassword />
                  </Route>
                  <Route path="/reset-password">
                    <ResetPassword />
                  </Route>
                  <Route path="/servers">
                    <Servers />
                  </Route>
                  <Route path="*">
                    <Redirect to="/servers" />
                  </Route>
                </Switch>
              </div>
              <div>
                <Footer />
              </div>
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </StylesProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
