import styled from '@emotion/styled';
import { Layout, MainTitle } from 'component/common';
import { colorPalette } from 'color/colorPalette';
import { useState } from 'react';
import { Button } from 'component/common/Button';

const WeddingInfoStyled = styled.div`
  padding: 79px 0 0;
  width: 100%;
  text-align: center;

  .wedding-info-title {
    font-size: 48px;
  }

  .wedding-info {
    padding-top: 36px;
    color: ${colorPalette.main_red};
    width: 85%;
    margin: 0 auto;
    
    p[class|='wedding-info'] {
      font-family: 'AppleSDGothicNeo-SemiBold';
      font-size: 17px;
      margin-bottom: 16px;
    }
    .special-no-thanks {
      padding-top: 20px;
      font-size: 14px;
      line-height: 26px;
      text-align: left;
    }
  }

  .toggle-wedding-info {
    width: 100%;
    color: ${colorPalette.main_red};
    background-color: ${colorPalette.main_pink};

    margin-top: 70px;
    // margin-bottom: 70px;

    button {
      background-color: inherit;
      border: 1px solid ${colorPalette.main_red};
      border-radius: 10px;
      outline: 0;
      color: inherit;
      height: 57px;
      width: 85%;
    }
  }

  .wedding-info-detailed {
    background-color: ${colorPalette.white};
  }

  .map-img {
    margin-top: 40px;
    margin-bottom: 20px;
    width: 110%;
    left: -10%;
    position: relative;
  }

  .how-to-come {
    display: block;
    width: 85%;
    margin: 0 auto;
    text-align: left;

    & > div {
      padding: 10px 0;

      & > p {
        font-family: 'AppleSDGothicNeo-Regular';
        font-size: 15px;
        letter-spacing: -0.06px;
        line-spacing: 34px;
        margin-bottom: 15px;
      }

      p[class|='come'] {
        font-family: 'AppleSDGothicNeo-ExtraBold';
        font-size: 16px;
        letter-spacing: -0.06px;
        line-spacing: 34px;
        margin-top: 14px;
      }
    }

    & > button {
      margin: 40px 0 100px;
    }
  }

  @media screen and (min-width: 390px) {
    .wedding-info > p[class|='wedding-info'] {
      font-size: 17px;
    }
  }

  @media screen and (max-width: 389px) {
    .wedding-info > p[class|='wedding-info'] {
      font-size: 16px;
    }
  }
`;

export const WeddingInfo = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const openMap = () => {
    console.log('go map');
    // <button onClick={() => window.open('[url 링크]', '_blank')}>[url 링크]</button>
  };

  return (
    <Layout color={colorPalette.main_pink}>
      <WeddingInfoStyled>
        <MainTitle color={colorPalette.main_red} className="wedding-info-title">
          결혼식 정보
        </MainTitle>
        <div className="wedding-info">
          <p className="wedding-info-time">2022년 10월 1일 (토) 18:30</p>
          <p className="wedding-info-location">서울특별시 강남구 도산대로 38길 32 토브헤세드</p>
          <p className="wedding-info-dress">드레스코드: 단풍색 (레드, 그린, 머스타드, 브라운)</p>
          <p className="special-no-thanks">* 드레스코드는 옷차림의 색상입니다. 단풍색과 비슷한 색상의 의상을 입어주시면 더 즐거운 시간이 될 것 같습니다. 물론, 필수는 아니니 부담갖지 않으셔도 되며, 포인트만 주셔도 무방합니다.</p>
        </div>
        <div className="toggle-wedding-info">
          <button type="button" onClick={() => setIsOpen(prev => !prev)}>
            찾아오시는 길 자세히 보기 {isOpen ? '▼' : '▲'}
          </button>
        </div>
        {isOpen && (
          <div className='wedding-info-detailed'>
            <img src="assets/images/map.png" className="map-img" />
            <div role="ul" className="how-to-come">
              <div role="li">
                <p className="come-subway">지하철로 오실 때</p>
                <p>7호선 학동역 10번 출구에서 셔틀버스 이용 혹은 도보 8분</p>
              </div>
              <div role="li">
                <p className="come-bus">버스로 오실 때</p>
                <p>• 145, 440, 4212번 버스 타고 언북중학교 입구 하차</p>
                <p>• 141, 3600번 버스 타고 서울세관 하차</p>
              </div>
              <div role="li">
                <p className="come-car">자가용으로 오실 때</p>
                <p>'토브헤세드' 식장 앞에서 주차 안내 예정</p>
              </div>
              <Button onClick={() => window.open('http://naver.me/Gptov4hj', '_blank')} backgroundColor={colorPalette.sub_sky_blue}>
                네이버지도 바로가기
              </Button>
            </div>
          </div>
        )}
      </WeddingInfoStyled>
    </Layout>
  );
};
