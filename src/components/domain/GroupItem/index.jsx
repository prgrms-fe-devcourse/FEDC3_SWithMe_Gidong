import { Header, Text } from '@/components/base';
import styled from '@emotion/styled';
import { COLOR } from '@/styles/color';
import { Divider } from '@/components/base';
import { css } from '@emotion/react';
import { useGroupContext } from '@/context/GroupProvider';

function GroupItem({ group, isLastGroup }) {
  const { openedGroupId, setOpenedGroupId } = useGroupContext();
  const { _id, name, description } = group;
  const { master, tagList, intro } = description;
  const isOpened = openedGroupId === _id;

  return (
    <StyledGroupItem>
      <StyledGroupHeader isOpened={isOpened} isLastGroup={isLastGroup}>
        <StyledGroupInfo>
          <Header strong level={3} color={COLOR.DARK}>
            {name}
          </Header>
          {!isOpened && (
            <>
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
            </>
          )}
        </StyledGroupInfo>
        <StyledToggleButton isOpened={isOpened} onClick={() => setOpenedGroupId(isOpened ? '' : _id)}>
          <i className='fa-solid fa-chevron-down'></i>
        </StyledToggleButton>
      </StyledGroupHeader>
    </StyledGroupItem>
  );
}

export default GroupItem;

const StyledGroupItem = styled.div``;

const StyledGroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem 1rem;
  ${({ isLastGroup, isOpened }) =>
    !isLastGroup &&
    !isOpened &&
    css`
      border-bottom: 0.1rem solid ${COLOR.GRAY_10};
    `};
  font-size: 2rem;

  & > div:last-child {
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 1rem;
    color: ${COLOR.GRAY_30};
    cursor: pointer;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${COLOR.TAG_COLOR[1]};
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

const StyledToggleButton = styled.div`
  & > i {
    transition: transform 0.3s ease-in-out;
    transform: rotateZ(0deg);
    transform: ${({ isOpened }) => isOpened && 'rotateZ(180deg)'};
  }
`;
