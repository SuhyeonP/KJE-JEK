import styled from '@emotion/styled';
import { MainTitle } from 'component/common';
import { colorPalette } from 'color/colorPalette';

const CommentStyled = styled.div``;

export const Comment = (): JSX.Element => {
  return (
    <CommentStyled>
      <MainTitle color={colorPalette.main_blue}>주언이와 은경이에게 전하는 말</MainTitle>
      <form className="comment-form">
        <input />
        <input />
      </form>
    </CommentStyled>
  );
};
