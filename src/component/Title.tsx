import styled from '@emotion/styled';

const TitleStyled = styled.div`
  position: sticky;
  top: calc(-50vh + 30px);
  padding-top: calc(50vh - 30px);

  background-color: white;

  text-align: center;

  .main-logo {
    height: 30px;
    background-color: bisque;
  }
`;

export const Title = (): JSX.Element => {
  return (
    <TitleStyled>
      <p className="main-logo">icon icon</p>
    </TitleStyled>
  );
};
