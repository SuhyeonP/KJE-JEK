import styled from '@emotion/styled';
import { colorPalette } from 'color/colorPalette';
import { MainTitle } from 'component/common';

const InviteTicketStyled = styled.div`
  display: block;
  width: 90%;
  margin: 180px auto 170px;

  text-align: center;

  .invite-you {
    margin-top: 21px;

    background-color: ${colorPalette.sub_red};
    border-radius: 8px;

    color: ${colorPalette.white};

    padding: 30px 20px;

    text-align: center;

    & > p {
      line-height: 30px;
    }

    .ticket-img {
      display: inline-block;
      width: 70%;
      height: 600px;

      margin-top: 60px;

      background-color: rgba(240, 248, 255, 0.47);
    }
  }
`;

export const InviteTicket = (): JSX.Element => {
  return (
    <InviteTicketStyled>
      <MainTitle color={colorPalette.main_red}>SPECIAL EVENT</MainTitle>
      <div className="invite-you">
        <p>청첩장에 이름을 적어 결혼식날 가져오시면</p>
        <p>추첨을 통해 소소한 선물을 드려요.</p>
        <div className="ticket-img" />
      </div>
    </InviteTicketStyled>
  );
};
