import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Footer from './components/Footer/Footer';

import Header from './containers/Header/Header';
import SignIn from './containers/SignIn/SignIn';
import SignUp from './containers/SignUp/SignUp';
import Servers from './containers/Servers/Servers';

// import background from './images/backgrounds/poly4.svg';

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
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default App;
