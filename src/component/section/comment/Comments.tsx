import styled from '@emotion/styled';
import { Comment } from 'component/section/comment/Comment';
import { colorPalette } from 'color/colorPalette';
import { useState } from 'react';
import { Button } from 'component/common/Button';

const CommentsStyled = styled.div`
  position: relative;

  margin: 300px 0 180px;
`;

const CommentWrapper = styled.div`
  border-radius: 8px;
  background-color: white;
  box-shadow: 5px 5px 8px #00000024;

  padding: 30px;

  margin-bottom: 30px;

  .modak-header {
    position: absolute;
    transform: translate(15%, -103%);

    display: flex;
    align-items: center;
    justify-content: center;

    width: 216px;
    height: 216px;

    background-color: rgba(48, 168, 253, 0.58);

    & > p {
      width: 200px;
      height: 200px;
      background-color: rgba(255, 150, 150, 0.58);
    }
  }
`;

const commentsDummy = [
  {
    id: 1,
    writer: '김sdfsf sfsdf 주언',
    emoji: '',
    time: '2021.11.22 13:11',
    comment:
      '갓 10대가 됐을 때\n그때 내가 널 보지 못했다면\n어땠을까 해\n왜인지 외로워지는 밤에 You say\n흐린 추억 속에 네게 안겨 잠드네\nYeah 친구들과의 술자리\n나는 또 네 얘기를 꺼내\n보고 싶다는 넋두리에 친구들 답은 뻔해\n10년도 더 된 애를 사랑할 수 있냬\n이제 그만 잊으래\n근데 그게 잘 안돼\n그래 걔 말마따나\n넌 아담의 사과일 수도',
  },
  {
    id: 2,
    writer: '윈터',
    emoji: '💨',
    time: '2022.8.6 16:11',
    comment:
      '갓 10대가 됐을 때구들과의 술자리\n나는 또 네 얘기를 꺼내\n보고 싶다는 넋두리에 친구들 답은 뻔해\n10년도 더 된 애를 사랑할 수 있냬\n이제 그만 잊으래\n근데 그게 잘 안돼\n그래 걔 말마따나\n넌 아담의 사과일 수도',
  },
  {
    id: 3,
    writer: 'test',
    emoji: '👻',
    time: '2014.8.6 16:11',
    comment:
      '갓 10대가 됐을 때구들과의 술자리\n나는 또 네 얘기를 꺼내\n보고 싶다는 넋두리에 친구들 답은 뻔해\n10년도 더 된 애를 사랑할 수 있냬\n이제 그만 잊으래\n근데 그게 잘 안돼\n그래 걔 말마따나\n넌 아담의 사과일 수도',
  },
];

export const Comments = (): JSX.Element => {
  const [count] = useState(50);
  const getMoreComment = () => {
    console.log('get more');
  };

  return (
    <CommentsStyled>
      {commentsDummy.map((comment, idx) => (
        <CommentWrapper key={comment.id}>
          {idx === 0 && (
            <div className="modak-header">
              <p>icon</p>
            </div>
          )}
          <Comment emoji={comment.emoji} writer={comment.writer} comment={comment.comment} time={comment.time} />
        </CommentWrapper>
      ))}
      <Button onClick={getMoreComment} backgroundColor={colorPalette.sub_sky_blue}>
        {count}개 댓글 더보기
      </Button>
    </CommentsStyled>
  );
};
