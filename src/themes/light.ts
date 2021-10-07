import { DefaultTheme } from 'styled-components';

const light: DefaultTheme = {
  colors: {
    alpha: '#cf432c',
    bravo: '#FFFFFF',
    charlie: '#99AAB5',
    delta: '#2C2F33',
    echo: '#23272A',
    foxtrot: '#000000',
    golf: {
      light: '#c2c07e',
      dark: '#b2b06f',
      darkest: '#969454',
    },
    juliet: '#d0a060',
    kilo: '#34383d',
    lima: '#F8F8FF',
    mike: '#DDDDE1',
    oscar: '#d7d7dc',
  },
  shadows: {
    light: 'rgba(35, 39, 42, 1)',
    lighter: 'rgba(35, 39, 42, .7)',
    lightest: 'rgba(35, 39, 42, .4)',
    dark: '#000000',
  },
  screens: {
    device: {
      sm: 1600,
      md: 1600,
      lg: 1600,
    },
    laptop: {
      sm: 1600,
      md: 1600,
      lg: 1600,
    },
    tv: {
      sm: 1600,
      md: 1600,
      lg: 1600,
    },
  },
};

export { light };
