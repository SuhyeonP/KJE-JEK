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
    font-family: 'AppleSDGothicNeo-Bold';
    & > span {
      color: ${colorPalette.sub_sky_blue};
    }
  }

  .more-comments {
    background-color: ${colorPalette.main_pink};
    border: 1px solid ${colorPalette.sub_sky_blue};
    color: ${colorPalette.sub_sky_blue};
    font-family: 'AppleSDGothicNeo-Bold';
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
  total: number;
}

const getComment = async (page: number) => {
  const data = await fetch(`http://localhost:8080/v1/comments?page=${page}&page_size=5`).then(res => res.json());
  return {
    data: data.comments,
    page: page + 1,
    isLast: data.total_items === data.comments.length + (page - 1) * 5,
    total: data.total_items,
  };
};

export const Comments = (): JSX.Element => {
  const [total, setTotal] = useState(0);
  const [isLast, setIsLast] = useState(false);

  const { data, fetchNextPage } = useInfiniteQuery<any, any, IHandleData>(
    ['get-comments'],
    ({ pageParam = 1 }) => getComment(pageParam),
    {
      getNextPageParam: lastPage => (!lastPage.isLast ? lastPage.page : undefined),
      onSuccess: data => {
        setTotal(data.pages[data.pages.length - 1].total);
        setIsLast(data.pages[data.pages.length - 1].isLast);
      },
    }
  );
  const getMoreComment = () => {
    fetchNextPage();
  };

  return (
    <CommentsStyled>
      <p className="comment-count">댓글 <span>{total}</span></p>
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
      {!isLast && (
        <Button className="more-comments" onClick={getMoreComment} backgroundColor={colorPalette.sub_sky_blue}>
          5개 댓글 더보기
        </Button>
      )}
    </CommentsStyled>
  );
};
