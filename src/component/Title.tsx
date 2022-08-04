import styled from '@emotion/styled';

const TitleStyled = styled.div`
  position: sticky;
  top: calc(-50vh + 48.43px);
  padding-top: calc(50vh - 48.43px);

  background-color: white;

  text-align: center;

  .main-logo {
    height: 48.43px;
    background-color: rgba(255, 242, 229, 0.23);
  }
`;

export const Title = (): JSX.Element => {
  return (
    <TitleStyled>
      <p className="main-logo">icon icon</p>
    </TitleStyled>
  );
};
