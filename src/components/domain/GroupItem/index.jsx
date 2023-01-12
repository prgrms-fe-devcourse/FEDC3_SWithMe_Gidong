import { Header, Text } from '@/components/base';
import styled from '@emotion/styled';
import { COLOR } from '@/styles/color';
import Divider from '@/components/base/Divider';
import { css } from '@emotion/react';

function GroupItem({ group, isLastGroup }) {
  const { name, description } = group;
  const { master, tagList, intro } = description;

  return (
    <StyledGroupItem isLastGroup={isLastGroup}>
      <StyledGroupInfo>
        <Header strong level={3} color={COLOR.DARK}>
          {name}
        </Header>
        <div>
          <Text color={COLOR.GRAY_30} size={1.8} weight={400}>
            <i className='fa-solid fa-crown'></i> {master.fullName}
          </Text>
          <Divider type='vertical' color={COLOR.GRAY_30} />
          <Text color={COLOR.GRAY_30} size={1.8} weight={300}>
            {intro}
          </Text>
        </div>
        <StyledTagList>
          {tagList.map((tag, i) => (
            <StyledTag key={tag} i={i % 4}>
              {tag}
            </StyledTag>
          ))}
        </StyledTagList>
      </StyledGroupInfo>
      <div>
        <i className='fa-solid fa-chevron-down'></i>
      </div>
    </StyledGroupItem>
  );
}

export default GroupItem;

const StyledGroupItem = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 2rem 1rem;
  ${({ isLastGroup }) =>
    !isLastGroup &&
    css`
      border-bottom: 0.1rem solid ${COLOR.GRAY_10};
    `};
  font-size: 2rem;

  & > div:last-child {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 4rem;
    border-radius: 1rem;
    color: ${COLOR.GRAY_30};
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: ${COLOR.GRAY_10};
    }
  }
`;

const StyledGroupInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1rem 0;
  font-size: 2rem;
`;

const StyledTagList = styled.div`
  display: flex;
  column-gap: 1rem;
`;

const StyledTag = styled.div`
  padding: 0.5rem 0.8rem;
  border-radius: 0.6rem;

  background-color: ${({ i }) => COLOR.TAG_COLOR[i]};
  font-size: 1.4rem;
  font-weight: 400;
  color: ${COLOR.WHITE};
`;
