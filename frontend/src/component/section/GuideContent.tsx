import styled from '@emotion/styled';
import { colorPalette } from 'color/colorPalette';
import { Layout, MainTitle } from 'component/common';

const GuideContentStyled = styled.div`
  @media screen and (min-width: 430px) {
    text-align: center;
    .modak-img > img {
      width: 50%;
    }
  }

  @media screen and (max-width: 429px) {
    .modak-img {
      & > img {
        width: 80%;
      }
    }
  }

  color: ${colorPalette.main_red};
  padding: 30px 0;

  .how-we-met {
    display: block;
    width: 85%;
    margin: 0 auto;

    & > div {
      margin: 26px 0;
    }
  }

  p {
    line-height: 36px;
    letter-spacing: 0px;
    white-space: break-spaces;
    font-size: 18px;

    padding: 20px 0;
  }

  .modak-img {
    text-align: center;
  }
`;

const content1 =
  '5년 전,\n우리가 처음 만난 그 날.\n밤새 모닥불 앞에서 서로를 바라보며 나눈\n이야기는 우리의 시작이 될 만큼 특별했습니다.\n이제는 평생 같은 곳을 바라보며 우리의\n이야기를 함께 만들어가려고 합니다.';
const content2 =
  '2022년 10월 1일 토요일,\n혼인이라는 제도를 만드신 하나님 앞에서\n둘이 만나 하나가 될 것을 약속하는 날입니다.\n이 뜻깊은 순간의 증인이 되어주시겠습니까?';

export const GuideContent = (): JSX.Element => {
  return (
    <Layout>
      <GuideContentStyled>
        <div className="how-we-met">
          <MainTitle color={colorPalette.main_red}>모시는 글</MainTitle>
          <p>{content1}</p>
          <p>{content2}</p>
          <p></p>
          <p>주언, 은경 올림</p>
          <div className="modak-img">
            <img src="assets/images/modaki-02.png" />
          </div>
        </div>
      </GuideContentStyled>
    </Layout>
  );
};

// export default GuideContent;
