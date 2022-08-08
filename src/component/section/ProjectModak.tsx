import styled from '@emotion/styled';
import { PageTitle } from 'component/common';
import { colorPalette } from 'color/colorPalette';

const ProjectModakStyled = styled.div`
  display: inline-block;
  background-color: ${colorPalette.main_pink};

  .temp-modak {
    position: absolute;
    // fixme modak이 아이콘 위치(세로)
    top: -300px;
    // fixme 이건 주언님이 안건들이셔도 돼요 제꺼에요
    //transform: translate(0, -200px);

    display: flex;
    justify-content: center;

    width: 100%;

    & > img {
      width: 280px;
    }
  }

  .explain-project-modak {
    position: relative;

    margin-top: 300px;
    background-color: ${colorPalette.main_red};

    color: white;

    .how-we-met {
      padding: 100px 10px;
    }

    p {
      line-height: 32px;
      font-size: 16px;
      padding: 20px 0;
      word-spacing: 3px;
    }
  }
`;
const content1 =
  'PROJECT MODAK 모닥불 앞에서 처음 만난 순간부터 시작된 주언이와 은경이의 인연을 하나의 협동 프로젝트에 비유한 것입니다.';
const content2 =
  '프로젝트의 목표는 모닥불이 밤을 밝히고 따뜻한 온기를 전하는 것처럼 하나님께서 기뻐하시는 가정을 이루어 주변을 밝혀주는 것입니다.';
const content3 = '2022년 10월 1일, 저희 결혼식으로 이 프로젝트의 시작을 알리려 합니다.';
//276.22pt74.89pt
export const ProjectModak = (): JSX.Element => {
  return (
    <ProjectModakStyled>
      <div className="explain-project-modak">
        <div className="temp-modak">
          <img src="assets/images/modaki-01.png" />
        </div>
        <div className="how-we-met">
          <PageTitle content="Project Modak" />
          <p>{content1}</p>
          <p>{content2}</p>
          <p>{content3}</p>
        </div>
      </div>
    </ProjectModakStyled>
  );
};

// fixme
// 추가로 내용을 적어보자면 뭔가 안된다고 느껴진느 부분들이 있을거에요
// p태그의 경우 여백 상쇄가 일어나는 태그에요 그래서 여백이 원하는데로 안벌여질수도 있습니다.
