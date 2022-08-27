import styled from '@emotion/styled';
import { colorPalette } from 'color/colorPalette';

const TitleStyled = styled.div`
  position: sticky;
  top: calc(-50vh + 38px);
  padding-top: calc(50vh - 38px);

  background-color: ${colorPalette.main_pink};
  z-index: 100;

  text-align: center;

  .main-logo {
    height: 38px;
    vertical-align: middle;
    margin: 3px 0;
  }
`;

export const Title = (): JSX.Element => {
  return (
    <TitleStyled>
      <img src="assets/images/logo.png" className="main-logo" />
    </TitleStyled>
  );
};
