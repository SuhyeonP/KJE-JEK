import styled from '@emotion/styled';
import { colorPalette } from 'color/colorPalette';

const TitleStyled = styled.div`
  position: sticky;
  top: calc(-50vh + 48.43px);
  padding-top: calc(50vh - 48.43px);

  background-color: ${colorPalette.main_pink};
  z-index: 100;

  text-align: center;

  .main-logo {
    height: 48.43px;
  }
`;

export const Title = (): JSX.Element => {
  return (
    <TitleStyled>
      <img src="assets/images/logo.png" className="main-logo" />
    </TitleStyled>
  );
};
