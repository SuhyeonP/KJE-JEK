import styled from '@emotion/styled';
import { colorPalette } from 'color/colorPalette';

interface IStyledProps {
  color?: string;
  ls?: string;
}

export const MainTitle = styled.div<IStyledProps>(
  ({ color = colorPalette.main_red, ls = '1px' }) => `
  color: ${color};
  font-weight: 400;
  font-size: 48px;
  font-family: '116watermelon';
  letter-spacing: ${ls};
`
);
