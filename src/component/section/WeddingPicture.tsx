import styled from '@emotion/styled';
import { MainTitle } from 'component/common';
import { colorPalette } from 'color/colorPalette';

import { useState } from 'react';

const imgs = [
  '4545-1',
  '4561',
  '4673',
  '4812',
  '4859',
  '4867',
  '4896',
  '5028-1',
  '5139',
  '5265',
  '5297',
  '5331',
  '5371',
];

const WeddingPictureStyled = styled.div`
  margin-bottom: 200px;
  .main-title {
    padding-bottom: 36px;
    text-align: center;
  }

  .wedding-picture {
    width: 100%;
    background-color: ${colorPalette.main_pink};
  }

  .wedding-img-slider {
    & > img {
      width: 100%;
    }
  }
`;

export const WeddingPicture = (): JSX.Element => {
  const [selected, setSelected] = useState(0);

  return (
    <WeddingPictureStyled>
      <div className="main-title">
        <MainTitle color={colorPalette.main_red}>웨딩 사진 보기</MainTitle>
      </div>
      <div className="wedding-picture">
        <div className="wedding-img-slider">
          <img src={`assets/images/wedding/4V4A${imgs[selected]}.jpg`} />
        </div>
      </div>
    </WeddingPictureStyled>
  );
};
