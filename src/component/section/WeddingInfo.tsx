import styled from '@emotion/styled';
import { MainTitle } from 'component/common';
import { colorPalette } from 'color/colorPalette';

const WeddingInfoStyled = styled.div`
  padding: 79px 0 0;

  text-align: center;

  .wedding-info {
    padding-top: 9px;
    p[class|='wedding-info'] {
      font-size: 17px;
      padding-top: 25px;
    }
    .special-no-thanks {
      font-size: 13px;
    }

    .go-map {
      background-color: ${colorPalette.main_red};
      color: white;
      border: 0;
      outline: 0;

      padding: 21px 19px;
    }
  }

  .map-img {
    margin: 70px 0;
    height: 790px;
    background-color: gray;
  }

  .how-to-come {
    display: block;
    width: 93%;
    margin: 0 auto;
    text-align: left;

    & > div {
      padding: 10px 0;

      & > p {
        font-weight: 400;

        &:first-child {
          padding-bottom: 10px;
          font-weight: 800;
        }
      }
    }
  }
`;

export const WeddingInfo = (): JSX.Element => {
  const openMap = () => {
    console.log('go map');
  };

  return (
    <WeddingInfoStyled>
      <MainTitle color={colorPalette.main_blue} className="wedding-info-title">
        결혼식 정보
      </MainTitle>
      <div className="wedding-info">
        <p className="wedding-info-time">2022년 10월 1일 (토) 18:30</p>
        <p className="wedding-info-location">서울특별시 강남구 도산대로 38길 32 토브헤세드</p>
        <p className="wedding-info-dress">드레스코드: 단풍색 (레드, 그린, 머스타드, 브라운)</p>
        <p className="special-no-thanks">* 축하 화환은 정중히 사양합니다. 마음만 감사히 받겠습니다.</p>
        <button onClick={openMap} className="go-map">
          네이버지도 바로가기
        </button>
      </div>
      <div className="map-img" />
      <div role="ul" className="how-to-come">
        <div role="li">
          <p className="come-subway">지하철로 오실 때</p>
          <p>7호선 학동역 10번 출구에서 셔틀버스 이용 혹은 도보 8분</p>
        </div>
        <div role="li">
          <p className="come-bus">버스로 오실 때</p>
          <p>- 145, 440, 4212번 버스 타고 언북중학교 입구 하차</p>
          <p>- 141, 3600번 버스 타고 서울세관 하차</p>
        </div>
        <div role="li">
          <p className="come-car">자가용으로 오실 때</p>
          <p>식장 앞에서 주차 안내 예정</p>
        </div>
      </div>
    </WeddingInfoStyled>
  );
};
