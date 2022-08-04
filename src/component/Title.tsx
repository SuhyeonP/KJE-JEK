import styled from '@emotion/styled';

const TitleStyled = styled.div`
  position: sticky;
  top: -45vh;
  height: 100vh;

  display: table;
  text-align: center;

  .main-logo {
    display: table-cell;
    vertical-align: middle;
  }
`;

export const Title = (): JSX.Element => {
  return (
    <TitleStyled>
      <p className="main-logo">icon icon</p>
    </TitleStyled>
  );
};
