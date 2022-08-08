import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { colorPalette } from 'color/colorPalette';

interface IStyledProps {
  color: string;
}

const LayoutStyled = styled.div<IStyledProps>(
  ({ color }) => `
  background-color: ${color};
`
);

interface IProps extends Partial<IStyledProps> {
  children: ReactNode;
}

export const Layout = ({ children, color = colorPalette.main_pink }: IProps): JSX.Element => {
  return <LayoutStyled color={color}>{children}</LayoutStyled>;
};
