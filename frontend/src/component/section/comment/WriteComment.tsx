import styled from '@emotion/styled';
import { Layout, MainTitle } from 'component/common';
import { colorPalette } from 'color/colorPalette';
import { useForm } from 'react-hook-form';
import { Comments } from 'component/section/comment/Comments';
import { useMutation } from '@tanstack/react-query';

const CommentStyled = styled.div`
  display: block;
  margin: 0 auto;
  width: 90%;
  .comment-title {
    text-align: center;
    padding: 155px 0 25px;
  }

  .comment-form {
    .comment-writer,
    .comment-content {
      width: 100%;
      margin-bottom: 17px;
      padding: 17px 21px;
      border-radius: 8px;
      outline: 0;
      border: 1px solid ${colorPalette.main_gray};
    }

    .comment-writer {
      height: 50px;
    }

    .comment-content {
      height: 150px;
    }

    .submit-comment {
      background-color: inherit;
      border: 0;
      outline: 0;
      float: right;
    }
  }

  .bye {
    display: flex;
    justify-content: center;

    .bye-modak {
      width: 80%;
    }
  }
`;

interface IPostComment {
  author: string;
  content: string;
}

const postComment = (request: IPostComment) => {
  console.log(request);
  return fetch('http://localhost:8080/v1/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(request),
  }).then(res => res.json());
};

export const WriteComment = (): JSX.Element => {
  const { register, handleSubmit } = useForm<IPostComment>();

  const commentMutation = useMutation<any, any, IPostComment>(postComment);

  const comment = (data: IPostComment) => {
    commentMutation.mutate(data);
  };

  return (
    <Layout color={colorPalette.white}>
      <CommentStyled>
        <div className="comment-title">
          <MainTitle color={colorPalette.sub_sky_blue}>주언이와 은경이에게 전하는 말</MainTitle>
        </div>
        <form className="comment-form" onSubmit={handleSubmit(comment)}>
          <input
            className="comment-writer"
            autoComplete="off"
            placeholder="이름을 입력해주세요."
            {...register('author')}
          />
          <textarea
            className="comment-content"
            autoComplete="off"
            placeholder="댓글을 남겨주세요."
            {...register('content')}
            maxLength={255}
          />
          <button className="submit-comment" type="submit">
            댓글 남기기
          </button>
        </form>
        <Comments />
        <div className="bye">
          <img src="assets/images/modaki-03.png" className="bye-modak" />
        </div>
      </CommentStyled>
    </Layout>
  );
};
