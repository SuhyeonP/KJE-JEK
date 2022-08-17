import styled from '@emotion/styled';
import { Comment } from 'component/section/comment/Comment';
import { colorPalette } from 'color/colorPalette';
import { useState } from 'react';
import { Button } from 'component/common/Button';
import { useInfiniteQuery } from '@tanstack/react-query';
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

interface IHandleData {
  data: IComment[];
  page: number;
  isLast: boolean;
}

const getComment = async (page: number) => {
  const data = await fetch(`http://localhost:8080/v1/comments?page=${page}&page_size=3`).then(res => res.json());
  return { data: data.comments, page: page + 1, isLast: false };
};

export const Comments = (): JSX.Element => {
  const [total] = useState(10);

  const { data, fetchNextPage } = useInfiniteQuery<any, any, IHandleData>(
    ['get-comments'],
    ({ pageParam = 1 }) => getComment(pageParam),
    {
      getNextPageParam: lastPage => (!lastPage.isLast ? lastPage.page : undefined),
    }
  );
  const getMoreComment = () => {
    fetchNextPage();
  };

  return (
    <CommentsStyled>
      <p className="comment-count">댓글 {total}</p>
      {data?.pages.map(page =>
        page.data.map(comment => (
          <Comment
            key={nanoid()}
            emoji={comment.emoji}
            writer={comment.author}
            comment={comment.content}
            time={comment.created_at}
          />
        ))
      )}
      <Button onClick={getMoreComment} backgroundColor={colorPalette.sub_sky_blue}>
        댓글 더 보기
      </Button>
    </CommentsStyled>
  );
};
