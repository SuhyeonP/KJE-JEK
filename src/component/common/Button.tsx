import styled from '@emotion/styled';
import { CSSProperties } from 'react';
import { colorPalette } from 'color/colorPalette';
import { css } from '@emotion/react';

interface IStyledProps {
  color?: CSSProperties['color'];
  backgroundColor?: CSSProperties['backgroundColor'];
}

export const Button = styled.button<IStyledProps>(
  ({ color = colorPalette.white, backgroundColor = colorPalette.main_pink }) => css`
    color: ${color};
    background-color: ${backgroundColor};
    width: 100%;
    border: 0;
    border-radius: 8px;
    outline: 0;

    padding: 20px 0;
    text-align: center;
  `
);
