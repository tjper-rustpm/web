import React from 'react';
import styled, { css, CSSProp } from 'styled-components';

import { StyledIconBase } from '@styled-icons/styled-icon';
import ButtonBase, { ButtonBaseProps } from '@material-ui/core/ButtonBase';
import CircularProgress from '@material-ui/core/CircularProgress';

interface StyledButtonProps {
  readonly slanted?: boolean;
  readonly loading?: boolean;
  readonly disabled?: boolean;
  readonly color?: 'green';
  readonly size?: 'compact';
}

const StyledButton = styled.div<StyledButtonProps>`
  ${({ color }: StyledButtonProps): CSSProp => {
    switch (color) {
      case 'green':
        return css`
          --primary-color: ${(props): string => props.theme.colors.golf.light};
          --primary-color-dark: ${(props): string => props.theme.colors.golf.dark};
          --primary-color-darkest: ${(props): string => props.theme.colors.golf.darkest};
        `;
    }
    return css`
      --primary-color: none;
      --primary-color-dark: none;
      --primary-color-darkest: none;
    `;
  }}
  ${({ size }: StyledButtonProps): CSSProp => {
    switch (size) {
      case 'compact':
        return css`
          --icon-height: 3rem;
          --padding: 1rem;
        `;
    }
    return css`
      --icon-height: 4rem;
      --padding: 2rem;
    `;
  }}

  transition: all 0.25s;
  filter: drop-shadow(0.3rem 0.3rem 0.5rem ${(props): string => props.theme.shadows.lightest});

  :hover {
    filter: drop-shadow(0.4rem 0.4rem 0.6rem ${(props): string => props.theme.shadows.lighter});
    & > .MuiButtonBase-root {
      background-color: var(--primary-color-dark);
    }
  }

  & > .MuiButtonBase-root {
    display: flex;
    align-items: center;

    opacity: 1;
    width: 100%;
    border-radius: 0.25rem;
    padding: var(--padding);
    background-color: var(--primary-color);

    font-family: Oxanium, sans-serif;
    font-size: 1.6rem;
  }

  ${StyledIconBase} {
    height: var(--icon-height);
    margin: 0 0.5rem;
  }

  ${({ slanted }: StyledButtonProps): CSSProp | null =>
    slanted
      ? css`
          & > .MuiButtonBase-root {
            clip-path: polygon(3% 0, 0 100%, 97% 100%, 100% 0);
          }
        `
      : null}
  ${({ disabled }: StyledButtonProps): CSSProp | null =>
    disabled
      ? css`
          transition: none;
          filter: none;

          & > .MuiButtonBase-root {
            opacity: 0.4;
          }
          :hover {
            filter: none;
            & > .MuiButtonBase-root {
              background-color: ${(props): string => props.theme.colors.golf.light};
            }
          }
        `
      : null}
  ${({ loading }: StyledButtonProps): CSSProp | null =>
    loading
      ? css`
          position: relative;

          & > .MuiButtonBase-root {
            opacity: 0.2;
          }
          .MuiCircularProgress-root {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -1.4rem;
            margin-top: -1.4rem;
          }
          .MuiCircularProgress-colorPrimary {
            color: var(--primary-color-darkest);
          }
        `
      : null}
`;

type ButtonProps = ButtonBaseProps & {
  className?: string;
  children: React.ReactNode;
  color?: 'green';
  size?: 'compact';
  slanted?: boolean;
  loading?: boolean;
  disabled?: boolean;
};

const Button = ({
  className,
  children,
  color,
  size,
  slanted,
  loading,
  disabled,
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <StyledButton
      className={className}
      color={color}
      size={size}
      slanted={slanted}
      loading={loading}
      disabled={disabled}
    >
      <ButtonBase disabled={disabled} {...rest}>
        {children}
      </ButtonBase>
      {loading ? <CircularProgress size={28} /> : null}
    </StyledButton>
  );
};

export default Button;
