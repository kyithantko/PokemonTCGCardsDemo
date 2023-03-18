import {DefaultTheme} from 'react-native-paper';

const COLOURS = {
  ...DefaultTheme.colors,
  // Paper
  primaryFontColor: '#1D1C1C',
};

const THEME = {
  ...DefaultTheme,
  dark: false,
  colors: COLOURS,
};

export {COLOURS};
export default THEME;
