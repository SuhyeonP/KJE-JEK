import styled from '@emotion/styled';

const TitleStyled = styled.div`
  position: sticky;
  top: -80px;
  padding-top: 100px;

  background-color: white;

  text-align: center;

  .main-logo {
    height: 16px;
  }
`;

export const Title = (): JSX.Element => {
  return (
    <TitleStyled>
      <p className="main-logo">icon icon</p>
    </TitleStyled>
  );
};
