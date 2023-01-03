import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Servers from './containers/Servers/Servers';

import { About } from './pages/About';
import { Faq } from './pages/Faq';
import { ForgotPassword } from './pages/ForgotPassword';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { VerifyEmail } from './pages/VerifyEmail';
import { ResetPassword } from './pages/ResetPassword';
import { Profile } from './pages/Profile';
import { Vip } from './pages/Vip';
import { VipStatus } from './pages/VipStatus';

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
            <Toaster
              position="bottom-center"
              reverseOrder={false}
              containerClassName="flex items-center gap-3"
              toastOptions={{ duration: 4000, className: 'min-w-fit text-xl text-center px-6 py-2' }}
            />
            <Helmet>
              <meta charSet="utf-8" />
              <title>Rustpm</title>
              <meta name="description" content="Rustpm operates scheduled Rust servers." />

              <meta property="og:url" content="https://rustpm.com" />
              <meta property="og:type" content="website" />
              <meta property="og:title" content="Rustpm" />
              <meta property="og:description" content="Rustpm operates scheduled Rust servers." />
              <meta property="og:image" content="https://s3.amazonaws.com/rustpm.public.assets/banner_dark.webp" />

              <meta name="twitter:card" content="summary_large_image" />
              <meta property="twitter:domain" content="rustpm.com" />
              <meta property="twitter:url" content="https://rustpm.com" />
              <meta name="twitter:title" content="Rustpm" />
              <meta name="twitter:description" content="Rustpm operates scheduled Rust servers." />
              <meta name="twitter:image" content="https://s3.amazonaws.com/rustpm.public.assets/banner_dark.webp" />
              <link rel="canonical" href="https://rustpm.com" />
            </Helmet>
            <div className="flex flex-col h-screen justify-between box-border">
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
                  <Route path="/about">
                    <About />
                  </Route>
                  <Route path="/faq">
                    <Faq />
                  </Route>
                  <Route path="/vip/status">
                    <VipStatus />
                  </Route>
                  <Route path="/vip/:serverID">
                    <Vip />
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
