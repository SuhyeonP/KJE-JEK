import styled from '@emotion/styled';
import { colorPalette } from 'color/colorPalette';

const GuideContentStyled = styled.div`
  background-color: ${colorPalette.main_red};

  color: ${colorPalette.white};
`;

export const GuideContent = (): JSX.Element => {
  return (
    <GuideContentStyled>
      <p>GuideContent</p>
    </GuideContentStyled>
  );
};

// export default GuideContent;
