import styled from 'styled-components';

import { AbsoluteCenter } from '../../styles/Center';
import { Icon } from '../../styles/Icon';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Check } from '@styled-icons/bootstrap/Check';
import { ErrorCircle } from '@styled-icons/boxicons-regular/ErrorCircle';

interface LoadingCardProps {
  className?: string;
  status: 'loading' | 'success' | 'error';
  text: string;
}

export const LoadingCard = ({ className, status, text }: LoadingCardProps): JSX.Element => {
  let statusComponent: JSX.Element;
  switch (status) {
    case 'loading':
      statusComponent = (
        <Icon size="small">
          <CircularProgress size={40} />
        </Icon>
      );
      break;
    case 'success':
      statusComponent = (
        <Icon>
          <Check />
        </Icon>
      );
      break;
    case 'error':
      statusComponent = (
        <Icon size="large">
          <ErrorCircle />
        </Icon>
      );
      break;
  }
  return (
    <AbsoluteCenter>
      <StyledCard className={className} loading={status === 'loading'}>
        <p>{text}</p>
        {statusComponent}
      </StyledCard>
    </AbsoluteCenter>
  );
};

interface StyledCardProps {
  readonly loading?: boolean;
}

const StyledCard = styled.div<StyledCardProps>`
  width: 40rem;
  padding: 3rem;

  p {
    font-size: 2.4rem;
    text-align: center;
    padding-bottom: 2rem;
  }

  ${Icon} {
    margin: 0 auto;
  }
`;
