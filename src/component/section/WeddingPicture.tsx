import styled from '@emotion/styled';
import { MainTitle } from 'component/common';
import { colorPalette } from 'color/colorPalette';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

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

  .slick-list {
    overflow-x: hidden;

    .slick-track {
      overflow-x: hidden;
    }
  }

  .slick-slide {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .slick-dots {
    width: 90%;
    & > li {
      width: 15px;
      height: 15px;

      & > button {
        width: 15px;
        height: 15px;

        padding: 0;
      }
      :before {
        width: 15px;
        height: 15px;
      }
    }
  }
`;

export const WeddingPicture = (): JSX.Element => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
  };

  return (
    <WeddingPictureStyled>
      <div className="main-title">
        <MainTitle color={colorPalette.main_red}>웨딩 사진 보기</MainTitle>
      </div>
      <div className="wedding-picture">
        {imgs.map(ele => (
          <div className="wedding-img-slider" key={ele}>
            <img src={`assets/images/wedding/4V4A${ele}.jpg`} />
          </div>
        ))}
      </div>
    </WeddingPictureStyled>
  );
};
