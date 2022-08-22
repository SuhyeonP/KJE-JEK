import styled from '@emotion/styled';

interface IStyledProps {
  color: string;
}

const PageTitleStyled = styled.div<IStyledProps>(
  ({ color }) => `
  color: ${color};
  font-size: 34px;
  font-family: 'AppleSDGothicNeo-Heavy';
  margin-bottom: 10px;
`
);

interface IProps extends Partial<IStyledProps> {
  content: string | number;
}

export const PageTitle = ({ content, color = 'white' }: IProps): JSX.Element => {
  return <PageTitleStyled color={color}>{content}</PageTitleStyled>;
};
