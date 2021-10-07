import styled from 'styled-components';

const StyledCard = styled.div`
  padding: 1.5rem;
  font-size: 3rem;
  background-color: ${(props): string => props.theme.colors.lima};
  box-shadow: 0 0.1rem 1rem 0 ${(props): string => props.theme.colors.echo};
  border-radius: 0.4rem;
`;

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card = ({ children, ...rest }: CardProps): JSX.Element => {
  return <StyledCard {...rest}>{children}</StyledCard>;
};

export default Card;
