import styled from '@emotion/styled';
import { Layout, MainTitle } from 'component/common';
import { colorPalette } from 'color/colorPalette';
import { useForm } from 'react-hook-form';
import { Comments } from 'component/section/comment/Comments';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const CommentStyled = styled.div`
  display: block;
  margin: 0 auto;
  width: 85%;
  .comment-title-div {
    text-align: center;
    padding: 0px 0 25px;

    .comment-title {
      font-size: 42px;
    }
  }

  font-family: 'AppleSDGothicNeo-Regular';

  .comment-writer::placeholder {
    color: ${colorPalette.main_gray};
    font-family: "AppleSDGothicNeo-Regular";
  }

  .comment-content::placeholder {
    color: ${colorPalette.main_gray};
    font-family: "AppleSDGothicNeo-Regular";
  }

  .comment-form {
    .comment-writer,
    .comment-content {
      width: 100%;
      margin-bottom: 17px;
      padding: 17px 21px;
      border-radius: 8px;
      outline: 0;
      border: 0px solid ${colorPalette.main_gray};
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
      color: ${colorPalette.dark_gray};
      font-size: 15px;
    }
  }

  .bye {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;

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
  return fetch(`/v1/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(request),
  }).then(res => res.json());
};

export const WriteComment = (): JSX.Element => {
  const { register, handleSubmit, setValue } = useForm<IPostComment>();
  // const { register, setValue, getValues } = useForm<IPostComment>();
  const queryClient = useQueryClient();

  const commentMutation = useMutation<any, any, IPostComment>(postComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-comments']);
      setValue('author', '');
      setValue('content', '');
    },
  });

  const comment = (data: IPostComment) => {
    if (data.author && data.content) {
      commentMutation.mutate(data);
    };
  };

  // const comment = () => {
  //   console.log(getValues("author"), getValues("content"));
  //   if (getValues("author") && getValues("content")) {
  //     commentMutation.mutate({
  //       "author": getValues("author"),
  //       "content": getValues("content"),
  //     });
  //   }
  // }

  return (
    <Layout color={colorPalette.main_pink}>
      <CommentStyled>
        <div className="comment-title-div">
          <MainTitle color={colorPalette.sub_sky_blue} className="comment-title">주언이와 은경이에게 전하는 말</MainTitle>
        </div>
        <form className="comment-form" onSubmit={handleSubmit(comment)}>
          <input
            className="comment-writer"
            autoComplete="off"
            placeholder="이름을 입력해주세요."
            {...register('author')}
            maxLength={50}
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
