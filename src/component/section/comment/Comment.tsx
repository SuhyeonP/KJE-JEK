import styled from '@emotion/styled';

const CommentStyled = styled.div``;

export interface ICommentProps {
  emoji: string;
  writer: string;
  comment: string;
  time: string;
}

export const Comment = ({ emoji, writer, comment, time }: ICommentProps): JSX.Element => {
  return (
    <CommentStyled>
      <div className="comment-writer-info">
        <span>{emoji}</span>
        <span>{writer}</span>
      </div>
      <div className="comment-content">
        <p>{comment}</p>
      </div>
    </CommentStyled>
  );
};

// export default Comment;
