import styled from '@emotion/styled';
import { MainTitle } from 'component/common';
import { colorPalette } from 'color/colorPalette';
import { useForm } from 'react-hook-form';

const CommentStyled = styled.div`
  .comment-title {
    text-align: center;
    margin-bottom: 26px;
  }

  .comment-form {
    display: block;
    margin: 0 auto;
    width: 90%;

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
`;

interface IFormProps {
  name: string;
  comment: string;
}

export const Comment = (): JSX.Element => {
  const { register, handleSubmit } = useForm<IFormProps>();

  const comment = (data: IFormProps) => {
    console.log(data);
  };

  return (
    <CommentStyled>
      <div className="comment-title">
        <MainTitle color={colorPalette.main_blue}>주언이와 은경이에게 전하는 말</MainTitle>
      </div>
      <form className="comment-form" onSubmit={handleSubmit(comment)}>
        <input className="comment-writer" autoComplete="off" placeholder="이름을 입력해주세요." {...register('name')} />
        <textarea
          className="comment-content"
          autoComplete="off"
          placeholder="댓글을 남겨주세요."
          {...register('comment')}
        />
        <button className="submit-comment" type="submit">
          댓글 남기기
        </button>
      </form>
    </CommentStyled>
  );
};
