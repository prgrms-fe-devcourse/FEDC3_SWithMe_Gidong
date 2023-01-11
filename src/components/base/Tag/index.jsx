import { Input, Text } from '@/components/base';
import styled from '@emotion/styled';
import { forwardRef, useState } from 'react';
import TagList from './TagList';

const Tag = forwardRef((props, ref) => {
  const [tagList, setTagList] = useState(ref.current);

  const addTagItem = (value) => {
    if (ref.current.includes(value)) {
      alert('이미 존재하는 태그입니다.');
      return;
    }

    const addedTagList = [...tagList, value];

    setTagList(addedTagList);
    ref.current = addedTagList;
  };

  const removeTagItem = (e) => {
    const deleteTagItem = e.target.parentNode.firstChild.nodeValue;
    const filteredTagList = tagList.filter((tagItem) => tagItem !== deleteTagItem);

    setTagList(filteredTagList);
    ref.current = filteredTagList;
  };

  const onKeyPress = (e) => {
    if (e.target.value.length === 0) return;
    addTagItem(e.target.value);
  };

  return (
    <>
      {tagList.length !== 0 && (
        <TagContainer disabled={tagList.length === 5}>
          <TagList tagList={tagList} onDeleteTagButtonClick={removeTagItem} />
        </TagContainer>
      )}
      {tagList.length < 5 ? (
        <Input
          ref={ref}
          type='text'
          placeholder='태그를 추가하려면 엔터를 누르세요.'
          max={8}
          onKeyPress={onKeyPress}
          wrapperProps={{ style: { width: '100%' } }}
          style={{ fontSize: '1.8rem' }}
        />
      ) : (
        <Text size={1.2} weight={300}>
          태그는 최대 5개까지 설정 가능합니다.
        </Text>
      )}
    </>
  );
  // }
});
Tag.displayName = 'Tag';

export default Tag;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 1rem 0;
  padding: 1rem;
  border: 0.2rem solid rgba(0, 0, 0, 0.3);
  border-radius: 1rem;

  border-color: ${({ disabled }) => (disabled ? 'none' : '#617ceb')};
`;
