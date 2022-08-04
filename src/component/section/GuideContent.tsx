import styled from '@emotion/styled';
import { colorPalette } from 'color/colorPalette';
import { MainTitle } from 'component/common';

const GuideContentStyled = styled.div`
  background-color: ${colorPalette.main_red};
  color: ${colorPalette.white};
  padding: 30px 0;

  p {
    line-height: 30px;
    letter-spacing: 1px;
    white-space: break-spaces;
    font-size: 19px;

    padding: 30px 0;
  }
  .temp-icon {
    width: 250px;
    height: 280px;
    margin: 84px auto 170px;
  }
`;

const content1 =
  '5년 전, 우리가 처음 만난 그 날.\n밤새 모닥불 앞에서\n서로를 바라보며 나누 이야기는\n우리의 시작이 될 만큼 특별했습니다.\n이제는 평생 같은 곳을 바라보며\n우리의 이야기를 함께 만들어가려고 합니다.';
const content2 =
  '2022년 10월 1일 토요일,\n우리는 창조주 하나님 앞에서\n하나가 될 것을 서약하고자 합니다.\n이 귀중한 약속의 증인이 되어주시겠습니까?';

export const GuideContent = (): JSX.Element => {
  return (
    <GuideContentStyled>
      <MainTitle color={colorPalette.white}>모시는 글</MainTitle>
      <p>{content1}</p>
      <p>{content2}</p>
      <p>주언, 은경 올림</p>
      <div className="temp-icon" />
    </GuideContentStyled>
  );
};

// export default GuideContent;
