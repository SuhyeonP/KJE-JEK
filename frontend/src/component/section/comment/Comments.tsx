import styled from '@emotion/styled';
import { Comment } from 'component/section/comment/Comment';
import { colorPalette } from 'color/colorPalette';
import { useState } from 'react';
import { Button } from 'component/common/Button';
import { useQuery } from '@tanstack/react-query';
import { nanoid } from 'nanoid';

const CommentsStyled = styled.div`
  position: relative;

  margin: 100px 0 180px;

  .comment-count {
    padding-bottom: 18px;
  }
`;

interface IComment {
  id: number;
  author: string;
  content: string;
  emoji: string;
  created_at: string;
}

const getComment = (page: number) => {
  return fetch(`http://localhost:8080/v1/comments?page=${page}&page_size=3`).then(res => res.json());
};

export const Comments = (): JSX.Element => {
  const [total] = useState(10);
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState<IComment[]>([]);

  const getMoreComment = () => {
    setPage(prev => prev + 1);
  };

  useQuery<any, any, Record<'comments', IComment[]>>(['get-comments', page], async () => await getComment(page), {
    onSuccess: data => {
      setComments(prev => {
        return prev.concat(data.comments);
      });
    },
  });

  return (
    <CommentsStyled>
      <p className="comment-count">댓글 {total}</p>
      {comments.map(comment => (
        <Comment
          key={nanoid()}
          emoji={comment.emoji}
          writer={comment.author}
          comment={comment.content}
          time={comment.created_at}
        />
      ))}
      <Button onClick={getMoreComment} backgroundColor={colorPalette.sub_sky_blue}>
        댓글 더 보기
      </Button>
    </CommentsStyled>
  );
};
