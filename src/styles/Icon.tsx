import styled, { css, CSSProp } from 'styled-components';
import { StyledIconBase } from '@styled-icons/styled-icon';

interface Props {
  readonly size?: 'small' | 'large';
  readonly color?: 'yellow';
}

export const Icon = styled.div`
  ${({ size }: Props): CSSProp => {
    let v = '5rem';
    if (size === 'small') {
      v = '4rem';
    }
    if (size === 'large') {
      v = '6rem';
    }
    return css`
      --width: ${v};
    `;
  }}
  ${({ color }: Props): CSSProp => {
    const res =
      color === 'yellow'
        ? css`
            --color: ${(props): string => props.theme.colors.charlie};
          `
        : css`
            --color: ${(props): string => props.theme.colors.golf.darkest};
          `;
    return res;
  }}

  width: var(--width);

  ${StyledIconBase} {
    color: var(--color);
  }
  .MuiCircularProgress-colorPrimary {
    color: var(--color);
  }
`;
