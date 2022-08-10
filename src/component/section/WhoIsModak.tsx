import styled from '@emotion/styled';
import { MainTitle } from 'component/common';
import { colorPalette } from 'color/colorPalette';
import { Button } from 'component/common/Button';
import Slider from 'react-slick';

const WhoIsModakStyled = styled.div`
  display: block;
  width: 90%;
  margin: 0 auto 320px;

  text-align: center;
  padding: 34px 0;

  .modak-history {
    padding-top: 35px;
    color: ${colorPalette.main_red};
    font-size: 15px;
    line-height: 24px;
  }

  .modak-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0 20px;
    padding: 2px;
    background-color: ${colorPalette.white};

    width: 100%;

    border: 1px solid ${colorPalette.main_red};
    border-radius: 8px;
    text-align: left;

    .modak-simple {
      width: 100%;
      background-color: ${colorPalette.main_pink};
      .modak-img {
        display: block;
        margin: 0 auto;
        width: 90%;
      }
      .slick-dots {
        top: 0;
        height: 20px;
      }
    }

    .modak-introduce {
      background-color: ${colorPalette.white};
      padding: 20px;
      .modak-list {
        display: flex;
        align-items: start;

        padding: 10px 0;

        & > p {
          &:first-child {
            width: 70px;
            max-width: 70px;
            padding-right: 10px;
          }
          &:last-child {
            width: calc(100% - 80px);
          }
        }
      }
    }
  }
`;
const modaks = Array.from({ length: 9 }, (_, idx) => idx + 1);

export const WhoIsModak = (): JSX.Element => {
  const settings = {
    dots: true,
    speed: 500,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    className: 'modak-img',
    // adaptiveHeight: true,
  };

  return (
    <WhoIsModakStyled>
      <MainTitle color={colorPalette.main_red}>모다기 소개서</MainTitle>
      <div className="modak-history">
        <p>모다기는 모닥불에서 영감을 받아 탄생한 캐릭터입니다.</p>
        <p>프로필에서부터 과거 사진들까지</p>
        <p>모다기에 대해 소개해드릴게요!</p>
      </div>
      <div className="modak-profile">
        <div className="modak-simple">
          {/*<p className="modak-img">img</p>*/}
          <Slider {...settings}>
            {modaks.map(ele => (
              <img src={`assets/images/modak/modaki-profile-0${ele}.png`} key={ele} />
            ))}
          </Slider>
        </div>
        <div className="modak-introduce">
          <div role="ul">
            <div role="li" className="modak-list">
              <p>이름</p>
              <p>모닥이</p>
            </div>
            <div role="li" className="modak-list">
              <p>생년월일</p>
              <p>17.09.02</p>
            </div>
            <div role="li" className="modak-list">
              <p>별자리</p>
              <p>처녀자리</p>
            </div>
            <div role="li" className="modak-list">
              <p>특기</p>
              <p>솔직한 대화 이끌어내기</p>
            </div>
            <div role="li" className="modak-list">
              <p>자기소개</p>
              <p>
                처음엔 수줍음이 많지만 사실 내면은 활활타는 열정으로 가득차 있습니다. 알고보면 섬세한 감정과 순수한
                정신을 간직하고 있스빈다. 모든 일에 헌신적인 사명감을 가지고 열심을 다하는 성격입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Button backgroundColor={colorPalette.main_red}>모다기 굿즈 보러가기</Button>
    </WhoIsModakStyled>
  );
};
