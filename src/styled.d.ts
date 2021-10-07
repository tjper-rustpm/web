import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      alpha: string;
      bravo: string;
      charlie: string;
      delta: string;
      echo: string;
      foxtrot: string;
      golf: {
        light: string;
        dark: string;
        darkest: string;
      };
      juliet: string;
      kilo: string;
      lima: string;
      mike: string;
      oscar: string;
    };

    shadows: {
      light: string;
      lighter: string;
      lightest: string;
      dark: string;
    };

    screens: {
      device: {
        sm: number;
        md: number;
        lg: number;
      };
      laptop: {
        sm: number;
        md: number;
        lg: number;
      };
      tv: {
        sm: number;
        md: number;
        lg: number;
      };
    };
  }
}
