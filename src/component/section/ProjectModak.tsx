import styled from '@emotion/styled';
import { content } from '../../content';
import { PageTitle } from '../common/PageTitle';

const ProjectModakStyled = styled.div`
  display: flex;
  align-items: flex-end;

  .temp-modak {
    position: absolute;
    top: -100px;
    //transform: translate(0, -200px);

    display: flex;
    justify-content: center;

    width: 100%;

    & > p {
      width: 60%;
      height: 200px;
      background-color: rgba(169, 169, 169, 0.53);
    }
  }

  .explain-project-modak {
    position: relative;
    padding-top: 100px;

    margin-top: 300px;
    height: 547px;
    background-color: red;
  }
`;

//276.22pt74.89pt
export const ProjectModak = (): JSX.Element => {
  return (
    <ProjectModakStyled>
      <div className="explain-project-modak">
        <div className="temp-modak">
          <p>icon</p>
        </div>
        <PageTitle content="Project Modak" />
        <p>{content['project_modack']}</p>
      </div>
    </ProjectModakStyled>
  );
};
