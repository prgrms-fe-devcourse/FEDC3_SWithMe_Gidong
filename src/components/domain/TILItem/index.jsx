import styled from '@emotion/styled';
import { Text } from '@/components/base';
import { COLOR } from '@/styles/color';

function TILItem({ til }) {
  const {
    title: { title, body, tagList },
  } = til;

  return (
    <StyledTILItem>
      <Text strong paragraph size={2.4} lineHeight={1.2}>
        {title}
      </Text>
      <Text paragraph size={1.8} weight={300} color={COLOR.DARK}>
        {body}
      </Text>
      <StyledTagList>
        {tagList?.map((tag) => (
          <StyledTag key={tag}>{tag}</StyledTag>
        ))}
      </StyledTagList>
      <StyledPlusButton>
        <i className='fa-solid fa-plus'></i>
      </StyledPlusButton>
    </StyledTILItem>
  );
}

export default TILItem;

const StyledTILItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;

  width: 22rem;
  height: 28rem;
  padding: 2rem;
  border-radius: 1rem;
  background-color: ${COLOR.CARD_BG};
  box-shadow: 0 0.1rem 0.4rem ${COLOR.SHADOW};
  color: ${COLOR.DARK};

  & > p:nth-of-type(2) {
    word-break: break-all;
  }
`;

const StyledPlusButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;

  width: 5rem;
  height: 5rem;
  border-top: 0.3rem solid ${COLOR.GRAY_20};
  border-left: 0.3rem solid ${COLOR.GRAY_20};
  border-radius: 1rem 0;
  background-color: ${COLOR.TAG_COLOR[0]};

  font-size: 2.5rem;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease-in;

  &:hover {
    filter: hue-rotate(90deg);
  }
`;

const StyledTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
`;

const StyledTag = styled.div`
  min-width: fit-content;
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: white;
  box-shadow: 0 0.1rem 0.4rem ${COLOR.SHADOW};
  font-size: 1.3rem;
`;
