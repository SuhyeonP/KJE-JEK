import styled from '@emotion/styled';
import { Title } from '../component';

//  @media screen and (max-width: 412px) {
//   }
const PageStyled = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  .section {
    margin-top: calc(100vh - 116px);

    & > div {
      min-height: calc(100vh - 56px);
      background-color: cornflowerblue;
    }
  }
`;

const Page = (): JSX.Element => {
  return (
    <PageStyled>
      <Title />
      <div className="section">
        <div>content</div>
        <div>content2</div>
      </div>
    </PageStyled>
  );
};

export default Page;
