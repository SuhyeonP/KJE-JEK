import styled from '@emotion/styled';
import { MainTitle } from 'component/common';
import { colorPalette } from 'color/colorPalette';

const WeddingPictureStyled = styled.div`
  margin-bottom: 200px;
  .main-title {
    padding-bottom: 36px;
    text-align: center;
  }

  .wedding-picture {
    width: 100%;
    height: 926px;
    background-color: gray;
  }
`;

export const WeddingPicture = (): JSX.Element => {
  return (
    <WeddingPictureStyled>
      <div className="main-title">
        <MainTitle color={colorPalette.main_red}>웨딩 사진 보기</MainTitle>
      </div>
      <div className="wedding-picture">wedding picture</div>
    </WeddingPictureStyled>
  );
};
