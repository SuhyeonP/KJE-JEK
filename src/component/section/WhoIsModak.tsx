import styled from '@emotion/styled';
import { MainTitle } from 'component/common';
import { colorPalette } from 'color/colorPalette';

const WhoIsModakStyled = styled.div`
  display: block;
  width: 90%;
  margin: 0 auto;

  text-align: center;
  padding: 34px 0;

  .modak-profile {
    height: 600px;
    margin: 70px 0 20px;

    border: 2px solid ${colorPalette.main_red};
    border-radius: 8px;
    text-align: left;

    .modak-simple {
      position: relative;

      .modak-simple-info {
        position: absolute;
        bottom: 10px;
        left: 10px;

        color: ${colorPalette.white};
      }
      .modak-img {
        height: 300px;
        background-color: ${colorPalette.main_red};
      }
    }
  }

  .show-goods {
    width: 100%;
    border: 0;
    outline: 0;
    color: ${colorPalette.white};
    background-color: ${colorPalette.main_red};

    padding: 20px 0;
    text-align: center;
  }
`;

export const WhoIsModak = (): JSX.Element => {
  return (
    <WhoIsModakStyled>
      <MainTitle color={colorPalette.main_red}>모다기 소개서</MainTitle>
      <p>모다기는 모닥불에서 영감을 받아 탄생한 캐릭터입니다.</p>
      <p>프로필에서부터 과거 사진들까지</p>
      <p>모다기에 대해 소개해드릴게요!</p>
      <div className="modak-profile">
        <div className="modak-simple">
          <p className="modak-img">img</p>
          <div className="modak-simple-info">
            <p>모다기</p>
            <p>5세, 경기도</p>
          </div>
        </div>
        <div className="modak-introduce">
          <div role="ul">
            <div role="li">
              <p>생년월일</p>
              <p>17.09.02</p>
            </div>
            <div role="li">
              <p>별자리</p>
              <p>처녀자리</p>
            </div>
            <div role="li">
              <p>특기</p>
              <p>솔직한 대화 이끌어내기</p>
            </div>
            <div role="li">
              <p>자기소개</p>
              <p>
                처음엔 수줍음이 많지만 사실 내면은 활활타는 열정으로 가득차 있습니다. 알고보면 섬세한 감정과 순수한
                정신을 간직하고 있스빈다. 모든 일에 헌신적인 사명감을 가지고 열심을 다하는 성격입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
      <button className="show-goods">모다기 굿즈 보러가기</button>
    </WhoIsModakStyled>
  );
};
