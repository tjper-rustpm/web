import React from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-column: col-start 3 / col-end 10;  

  & h1 { 
    font-size: 5rem;
    margin-bottom: 5rem;
  }
  & p {
    font-size: 2rem;
  }
  & p:not(:last-child) {
    margin-bottom: 3rem;
  }
`;

function HowItWorks({className}) {
  return (
    <Container class={className}>
      <h1>How It Works</h1>
      <p>Same Rust we all love. The grind, the high-risk high-reward decisions, and the friendships. It's all there.</p>
      <p>Each Rustpm server starts and stops on a predictable schedule. Go to bed knowing you'll have something to defend the next day.</p>
      <p>We're ready. Our team is prepared to launch servers throughout North America and Europe, so you can find a server that works for your region and schedule.</p>
    </Container>
  );
};

export default HowItWorks;
