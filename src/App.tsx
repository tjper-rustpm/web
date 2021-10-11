import { Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Footer from "./components/Footer/Footer";

import Header from "./containers/Header/Header";
import SignIn from "./containers/SignIn/SignIn";
import SignUp from "./containers/SignUp/SignUp";
import Servers from "./containers/Servers/Servers";

// import background from './images/backgrounds/poly4.svg';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { light } from "themes/light";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/apollo";
import { StylesProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import { UserServiceProvider } from "./providers/User/User";
import { ServerServiceProvider } from "./providers/Server/Server";

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

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider theme={light}>
        <ApolloProvider client={client}>
          <StylesProvider injectFirst>
            <SnackbarProvider>
              <UserServiceProvider>
                <ServerServiceProvider>
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
                </ServerServiceProvider>
              </UserServiceProvider>
            </SnackbarProvider>
          </StylesProvider>
        </ApolloProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
