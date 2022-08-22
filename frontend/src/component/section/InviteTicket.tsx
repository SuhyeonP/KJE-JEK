import styled from '@emotion/styled';
import { colorPalette } from 'color/colorPalette';
import { MainTitle } from 'component/common';

const InviteTicketStyled = styled.div`
  display: block;
  width: 85%;
  margin: 180px auto 170px;

  text-align: center;

  .special-event {
    font-size: 42px;
  }

  .invite-you {
    margin-top: 21px;

    background-color: ${colorPalette.white};
    border: 1px solid ${colorPalette.main_red};
    border-radius: 8px;

    color: ${colorPalette.main_red};

    padding: 30px 20px;

    text-align: center;

    & > p {
      line-height: 30px;
    }

    .ticket-img {
      display: inline-block;
      width: 70%;

      margin-top: 50px;
      margin-bottom: 50px;

      box-shadow: 5px 5px 8px #00000024;
    }
  }
`;

export const InviteTicket = (): JSX.Element => {
  return (
    <InviteTicketStyled>
      <MainTitle color={colorPalette.main_red} className="special-event">SPECIAL EVENT</MainTitle>
      <div className="invite-you">
        <p>청첩장에 이름을 적어 결혼식날 가져오시면</p>
        <p>추첨을 통해 소소한 선물을 드려요.</p>
        <img className="ticket-img" src="assets/images/invitation.png" />
      </div>
    </InviteTicketStyled>
  );
};
