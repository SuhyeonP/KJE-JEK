import styled from '@emotion/styled';

const TitleStyled = styled.div`
  position: sticky;
  padding-top: 30vh;
  top: -22vh;
`;

export const Title = (): JSX.Element => {
  return (
    <TitleStyled>
      <p>icon icon</p>
    </TitleStyled>
  );
};
