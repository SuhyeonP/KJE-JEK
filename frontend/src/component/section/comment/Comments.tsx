import styled from '@emotion/styled';
import { Comment } from 'component/section/comment/Comment';
import { colorPalette } from 'color/colorPalette';
import { useState } from 'react';
import { Button } from 'component/common/Button';
import { useQuery } from '@tanstack/react-query';

const CommentsStyled = styled.div`
  position: relative;

  margin: 100px 0 180px;
`;

const CommentWrapper = styled.div`
  border-radius: 8px;
  background-color: white;
  box-shadow: 5px 5px 8px #00000024;

  padding: 30px;

  margin-bottom: 30px;
`;

const commentsDummy = [
  {
    id: 1,
    author: '김sdfsf sfsdf 주언',
    emoji: '',
    created_at: '2021.11.22 13:11',
    content:
      '갓 10대가 됐을 때\n그때 내가 널 보지 못했다면\n어땠을까 해\n왜인지 외로워지는 밤에 You say\n흐린 추억 속에 네게 안겨 잠드네\nYeah 친구들과의 술자리\n나는 또 네 얘기를 꺼내\n보고 싶다는 넋두리에 친구들 답은 뻔해\n10년도 더 된 애를 사랑할 수 있냬\n이제 그만 잊으래\n근데 그게 잘 안돼\n그래 걔 말마따나\n넌 아담의 사과일 수도',
  },
  {
    id: 2,
    author: '윈터',
    emoji: '💨',
    created_at: '2022.8.6 16:11',
    content:
      '갓 10대가 됐을 때구들과의 술자리\n나는 또 네 얘기를 꺼내\n보고 싶다는 넋두리에 친구들 답은 뻔해\n10년도 더 된 애를 사랑할 수 있냬\n이제 그만 잊으래\n근데 그게 잘 안돼\n그래 걔 말마따나\n넌 아담의 사과일 수도',
  },
  {
    id: 3,
    author: 'test',
    emoji: '👻',
    created_at: '2014.8.6 16:11',
    content:
      '갓 10대가 됐을 때구들과의 술자리\n나는 또 네 얘기를 꺼내\n보고 싶다는 넋두리에 친구들 답은 뻔해\n10년도 더 된 애를 사랑할 수 있냬\n이제 그만 잊으래\n근데 그게 잘 안돼\n그래 걔 말마따나\n넌 아담의 사과일 수도',
  },
];

//{
//   "comments": [
//     {
//       "id": 0,
//       "author": "string",
//       "content": "string",
//       "emoji": "string",
//       "created_at": "string"
//     }
//   ]
// }

interface IComment {
  id: number;
  author: string;
  content: string;
  emoji: string;
  created_at: string;
}

const getComment = (page: number) => {
  return fetch(`http://localhost:8080/v1/comments?page=${page}`).then(res => res.json());
};

export const Comments = (): JSX.Element => {
  const [total] = useState(10);
  const [count] = useState(50);
  const getMoreComment = () => {
    console.log('get more');
  };

  const { data } = useQuery<any, any, Record<'comments', IComment[]>>(
    ['get-comments'],
    async () => await getComment(1),
    {
      onSuccess: data => {
        console.log(data);
      },
    }
  );

  return (
    <CommentsStyled>
      <p>댓글 {total}</p>
      {data?.comments.map(comment => (
        <Comment
          key={comment.id}
          emoji={comment.emoji}
          writer={comment.author}
          comment={comment.content}
          time={comment.created_at}
        />
      ))}
      <Button onClick={getMoreComment} backgroundColor={colorPalette.sub_sky_blue}>
        {count}개 댓글 더보기
      </Button>
    </CommentsStyled>
  );
};
