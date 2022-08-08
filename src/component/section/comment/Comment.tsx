import styled from '@emotion/styled';
import { useMemo, useRef } from 'react';
import { getDateOfGap } from 'date-preset/src/getDateGap';

const CommentStyled = styled.div`
  .comment-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export interface ICommentProps {
  emoji: string;
  writer: string;
  comment: string;
  time: string;
}

export const Comment = ({ emoji, writer, comment, time }: ICommentProps): JSX.Element => {
  const now = useRef(Date.now());
  const timeFormatter = useMemo(() => {
    const compare = getDateOfGap(new Date(time).getTime(), now.current);
    const randomNumber = Math.floor(Math.random() * 10);

    if ([0, 1].indexOf(randomNumber) === 1) {
      return ['김치전', '파전', '굴전', '호박전', '녹두전', '감자전', '육전'][Math.floor(Math.random() * 7)];
    }

    if (compare.gap === 'today') {
      if (compare.minuteGap < 60) {
        return `${compare.minuteGap}분 전`;
      }
      return `${compare.hourGap} 시간 전`;
    } else {
      if (compare.dateGap < 30) {
        return `${compare.dateGap}일 전`;
      } else if (compare.dateGap < 365) {
        return `${Math.floor(compare.dateGap / 30)}달 전`;
      } else {
        return `${Math.floor(compare.dateGap / 365)} 년 전`;
      }
    }
  }, [time]);

  return (
    <CommentStyled>
      <div className="comment-header">
        <div className="comment-writer-info">
          <span>{emoji}</span>
          <span>{writer}</span>
        </div>
        <span>{timeFormatter}</span>
      </div>
      <div className="comment-content">
        <p>{comment}</p>
      </div>
    </CommentStyled>
  );
};

// export default Comment;
