import styled from '@emotion/styled';
import { useMemo, useRef } from 'react';
import { getDateOfGap } from 'date-preset/src/getDateGap';
import { colorPalette } from 'color/colorPalette';

const CommentStyled = styled.div`
  box-shadow: 5px 5px 8px ${colorPalette.shadow_color};
  border-radius: 8px;
  background-color: ${colorPalette.white};

  padding: 20px 25px 18px 25px;
  margin-bottom: 30px;

  min-height: 116px;

  .comment-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 13px;

    .comment-writer-info {
      display: flex;
      width: 80%;
      font-size: 15px;
      font-family: 'AppleSDGothicNeo-Bold';
    }

    .emoji {
      padding-right: 10px;
    }

    .comment-writer {
      flex: 1;

      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      word-break: break-all;
    }

    .comment-created-at {
      font-size: 13px;
      color: ${colorPalette.time_color};
    }

  }

  .comment-content {
    & > p {
      font-size: 14px;
      line-height: 1.5;
    }
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
      return ['김치전', '파전', '굴전', '호박전', '녹두전', '감자전'][Math.floor(Math.random() * 7)];
    }

    if (compare.gap === 'today') {
      if (compare.minuteGap < 60) {
        if (compare.minuteGap < 1) {
          return '방금 전';
        }
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
          <span className="emoji">{emoji}</span>
          <span className="comment-writer">{writer}</span>
        </div>
        <span className="comment-created-at">{timeFormatter}</span>
      </div>
      <div className="comment-content">
        <p>{comment}</p>
      </div>
    </CommentStyled>
  );
};

// export default Comment;
