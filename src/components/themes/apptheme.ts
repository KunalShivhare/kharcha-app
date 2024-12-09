import { createContext } from 'react';
import TYPOGRAPHY, { ColorType } from './typography';
export interface ThemeProps {
  colors: ColorType;
}
export const LightTheme: ThemeProps = {
  colors: TYPOGRAPHY.ThemeColor.light,
};
export const DarkTheme: ThemeProps = {
  colors: TYPOGRAPHY.ThemeColor.dark,
};
const AppTheme = createContext<ThemeProps>(LightTheme);
export default AppTheme;
