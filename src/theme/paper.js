import {DefaultTheme} from 'react-native-paper';

const COLOURS = {
  ...DefaultTheme.colors,
  primaryFontColor: '#1D1C1C',
  secondaryFontColor: '#A5A5A5',
  buttonColor: '#4789F5',
};

const THEME = {
  ...DefaultTheme,
  dark: false,
  colors: COLOURS,
};

export {COLOURS};
export default THEME;
