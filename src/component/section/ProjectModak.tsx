import styled from '@emotion/styled';
import { content } from '../../content';

const ProjectModakStyled = styled.div`
  display: flex;
  align-items: flex-end;

  background-color: bisque;
  .temp-modak {
    position: absolute;
    height: 200px;
    width: 200px;
    background-color: darkgray;
    transform: translate(50%, -100px);
  }
  .explain-project-modak {
    position: relative;

    margin-top: 300px;
    height: 547px;
    background-color: #fffff3;
  }
`;

export const ProjectModak = (): JSX.Element => {
  return (
    <ProjectModakStyled>
      <div className="explain-project-modak">
        <p className="temp-modak">Icon</p>
        <p>title</p>
        <p>{content['project_modack']}</p>
      </div>
    </ProjectModakStyled>
  );
};
