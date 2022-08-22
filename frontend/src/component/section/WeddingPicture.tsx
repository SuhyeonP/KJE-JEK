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
  @media screen and(max-width: 429px) {
    .slider-wrapper {
      width: 100%;
    }
  }
  @media screen and (min-width: 430px) {
    .slider-wrapper {
      display: block;
      width: 60%;
      margin: 0 auto;
    }
  }

  margin-bottom: 200px;

  .main-title {
    padding-bottom: 36px;
    text-align: center;
  }
  .slick-track {
    display: flex;
    align-items: center;
  }

  .slick-dots {
    list-style: none; 
    & > li {
      width: 7px;
      height: 15px;
      & > button {
        padding: 0;
        width: 5px;
        height: 5px;
      }
      & > button::before {
        content: '●';
        color: ${colorPalette.main_red};
        font-size: 12px;
        width: 5px;
        height: 5px;
      }
    }
  }
`;

export const WeddingPicture = (): JSX.Element => {
  const settings = {
    dots: true,
    speed: 500,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    className: 'slider-wrapper',
    adaptiveHeight: false,
    // dotsClass: 'slick-dots',
  };
  return (
    <WeddingPictureStyled>
      <div className="main-title">
        <MainTitle color={colorPalette.main_red}>웨딩 사진 보기</MainTitle>
      </div>
      <Slider {...settings}>
        {imgs.map(ele => (
          <img src={`assets/images/wedding/4V4A${ele}.jpg`} key={ele} className="slide-img" />
        ))}
      </Slider>
    </WeddingPictureStyled>
  );
};
//
// <div className="wedding-img-slider">
//   <img src={`assets/images/wedding/4V4A${imgs[selected]}.jpg`} />
// </div>
// <div>
