import styled from '@emotion/styled';
import { colorPalette } from '../../colorPalette';

interface IStyledProps {
  color?: string;
}

export const MainTitle = styled.p<IStyledProps>(
  ({ color = colorPalette.main_red }) => `
  color: ${color};
  font-weight: 800;
  font-size: 48px;
  font-family: '116watermelon';
`
);
