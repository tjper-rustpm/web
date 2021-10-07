import React from "react";
import styled from "styled-components";

const Intro = styled.div`
  grid-column: col-start 3 / col-end 10;  

  display: grid;
  grid-template-columns: repeat(auto-fit, [col-start] minmax(35rem, 1fr) [col-end]);
  row-gap: 5em;
  column-gap: 5em;
`;

const IntroSection = styled.div`
  background-color: ${props => props.theme.bravo};
  color: ${props => props.theme.alpha};
  padding: 1.5rem;
  box-shadow: 0 0 .2rem 0 ${props => props.theme.echo};
  border-radius: .3rem;
  

  h2 {
    font-size: 4rem;
    margin-bottom: 2rem;
  }
  p {
    font-size: 2rem;
  }
  p:not(:last-child) {
    margin-bottom: 3rem;
  }
`;

function Greeting({className}) {
  return (
    <Intro className={className}>
      <IntroSection>
        <h2>Premium Servers</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis risus quam, eu pellentesque orci ultricies vel. Quisque laoreet dui ac dolor placerat, nec tincidunt enim vulputate. Praesent lectus sem, congue vel iaculis sit amet, auctor id lectus.</p>
      </IntroSection>
      <IntroSection>
        <h2>Scheduled</h2>
        <p>Phasellus in mi enim. Fusce a nibh aliquet, fringilla sapien ut, ultrices dolor. Morbi aliquet tempus libero, ut commodo est accumsan non. Vestibulum at nunc sit amet est venenatis malesuada. In maximus ut nunc vel convallis.</p>
      </IntroSection>
      <IntroSection>
        <h2>Membership</h2>
        <p>Fusce arcu dui, sodales sit amet sapien sed, hendrerit auctor lectus. Mauris vulputate leo ac ultrices convallis. Integer volutpat arcu quis felis accumsan mattis. Nam convallis nulla et purus elementum lobortis.</p>
      </IntroSection>
      <IntroSection>
        <h2>Moderation</h2>
        <p>Ut pellentesque posuere vehicula. Donec sodales tempus viverra. Nullam non massa tellus. Nullam et faucibus lacus, vitae sollicitudin metus. Fusce eu ornare velit. Aliquam at ligula nunc. Duis sapien urna, sollicitudin vitae posuere non, lobortis non lacus.</p>
      </IntroSection>
    </Intro>
  );
};

export default Greeting;
