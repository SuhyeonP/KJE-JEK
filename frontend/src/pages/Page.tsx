import styled from '@emotion/styled';
import {
  WriteComment,
  GuideContent,
  InviteTicket,
  ProjectModak,
  Title,
  WeddingInfo,
  WeddingPicture,
  WhoIsModak,
} from 'component';
import { colorPalette } from 'color/colorPalette';

//  @media screen and (max-width: 412px) {
//   }
const PageStyled = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  background-color: ${colorPalette.main_pink};

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
        <InviteTicket />
        <WeddingPicture />
        <WhoIsModak />
        <WriteComment />
      </div>
    </PageStyled>
  );
};

export default Page;
