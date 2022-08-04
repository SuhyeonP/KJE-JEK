import styled from '@emotion/styled';
import { MainTitle } from 'component/common';
import { colorPalette } from 'color/colorPalette';

const WeddingPictureStyled = styled.div``;

export const WeddingPicture = (): JSX.Element => {
  return (
    <WeddingPictureStyled>
      <MainTitle color={colorPalette.main_red}>웨딩 사진 보기</MainTitle>
    </WeddingPictureStyled>
  );
};
