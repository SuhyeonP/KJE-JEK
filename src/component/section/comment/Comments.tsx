import styled from '@emotion/styled';
import { Comment } from 'component/section/comment/Comment';
import { colorPalette } from 'color/colorPalette';

const CommentsStyled = styled.div`
  position: relative;

  margin-top: 300px;
`;

const CommentWrapper = styled.div`
  border: 3px solid ${colorPalette.main_blue};
  border-radius: 8px;

  padding: 30px;

  margin-bottom: 20px;
  .modak-header {
    position: absolute;
    transform: translate(15%, -103%);

    width: 216px;
    height: 216px;

    background-color: white;
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
    time: '2021.11.22 13:11',
    comment:
      '갓 10대가 됐을 때구들과의 술자리\n나는 또 네 얘기를 꺼내\n보고 싶다는 넋두리에 친구들 답은 뻔해\n10년도 더 된 애를 사랑할 수 있냬\n이제 그만 잊으래\n근데 그게 잘 안돼\n그래 걔 말마따나\n넌 아담의 사과일 수도',
  },
];

export const Comments = (): JSX.Element => {
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
    </CommentsStyled>
  );
};
