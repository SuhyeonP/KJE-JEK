import styled from '@emotion/styled';
import { MainTitle } from 'component/common';
import { colorPalette } from 'color/colorPalette';
import { useForm } from 'react-hook-form';

const CommentStyled = styled.div``;

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
      <MainTitle color={colorPalette.main_blue}>주언이와 은경이에게 전하는 말</MainTitle>
      <form className="comment-form" onSubmit={handleSubmit(comment)}>
        <input {...register('name')} />
        <input {...register('comment')} />
        <button>댓글 남기기</button>
      </form>
    </CommentStyled>
  );
};
