import styled from '@emotion/styled';
import { Title } from '../component';

//  @media screen and (max-width: 412px) {
//   }
const PageStyled = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  .section {
    height: 100vh;
  }
`;

const Page = (): JSX.Element => {
  return (
    <PageStyled>
      <Title />
      <div className="section">
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
      </div>
    </PageStyled>
  );
};

export default Page;
