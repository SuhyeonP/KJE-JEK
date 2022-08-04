import styled from '@emotion/styled';
import { GuideContent, ProjectModak, Title, WeddingInfo } from 'component';

//  @media screen and (max-width: 412px) {
//   }
const PageStyled = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  .section {
    margin-top: 50vh;

    & > div {
      min-height: calc(100vh - 48.43px);
    }
  }
`;

const Page = (): JSX.Element => {
  return (
    <PageStyled>
      <Title />
      <div className="section">
        <ProjectModak />
        <WeddingInfo />
        <GuideContent />
      </div>
    </PageStyled>
  );
};

export default Page;
