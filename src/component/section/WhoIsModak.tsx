import styled from '@emotion/styled';
import { MainTitle } from 'component/common';
import { colorPalette } from 'color/colorPalette';

const WhoIsModakStyled = styled.div``;

export const WhoIsModak = (): JSX.Element => {
  return (
    <WhoIsModakStyled>
      <MainTitle color={colorPalette.main_red}>모다기가 누구에요</MainTitle>
    </WhoIsModakStyled>
  );
};
