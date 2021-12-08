import styled from 'styled-components';

export const Card = styled.div`
  padding: 1.5rem;
  font-size: 3rem;
  background-color: ${(props): string => props.theme.colors.lima};
  box-shadow: 0 0.1rem 1rem 0 ${(props): string => props.theme.colors.echo};
  border-radius: 0.4rem;

  width: 90%;
  margin: 0 auto;
`;
