import React from 'react';
import styled from 'styled-components';
import { Link as ReactRouterLink } from 'react-router-dom';

const StyledLink = styled(ReactRouterLink)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
interface LinkProps {
  to: string;
  children: React.ReactNode;
}
export const Link = ({ to, children, ...rest }: LinkProps): JSX.Element => (
  <StyledLink to={to} {...rest}>
    {children}
  </StyledLink>
);
