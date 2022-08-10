import styled from '@emotion/styled';

interface IStyledProps {
  color: string;
}

const PageTitleStyled = styled.span<IStyledProps>(
  ({ color }) => `
  color: ${color};
  font-size: 28px;
  font-family: 'AppleSDGothicNeo', 'Noto Sans KR', sans-serif;
  font-weight: 800;
`
);

interface IProps extends Partial<IStyledProps> {
  content: string | number;
}

export const PageTitle = ({ content, color = 'white' }: IProps): JSX.Element => {
  return <PageTitleStyled color={color}>{content}</PageTitleStyled>;
};
