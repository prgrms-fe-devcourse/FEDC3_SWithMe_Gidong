import { Input, Text } from '@/components/base';
import { useToastContext } from '@/context/ToastProvider';
import useInput from '@/hooks/useInput';
import { StyledTagListWrapper } from './styles';
import TagList from './TagList';

function TagInput({ tagList = [], onChange, wrapperProps, inputProps, ...props }) {
  const tag = useInput('');
  const { addToast } = useToastContext();

  const addTagItem = (value) => {
    if (tagList.includes(value)) {
      addToast('이미 존재하는 태그입니다.');
      return;
    }

    const addedTagList = [...tagList, value];
    onChange && onChange(addedTagList);
  };

  const removeTagItem = (e) => {
    const deleteTagItem = e.target.parentNode.firstChild.nodeValue;
    const filteredTagList = tagList.filter((tagItem) => tagItem !== deleteTagItem);
    onChange && onChange(filteredTagList);
  };

  const onKeyPress = (e) => {
    if (e.target.value.length === 0) return;
    addTagItem(e.target.value);
  };

  return (
    <>
      {tagList.length !== 0 && (
        <StyledTagListWrapper disabled={tagList.length === 5} {...wrapperProps}>
          <TagList tagList={tagList} onDeleteTagButtonClick={removeTagItem} {...props} />
        </StyledTagListWrapper>
      )}
      {tagList.length < 5 ? (
        <Input
          value={tag.value}
          onChange={tag.onChange}
          type='text'
          placeholder='태그를 추가하려면 엔터를 누르세요.'
          max={8}
          onKeyPress={onKeyPress}
          wrapperProps={{ style: { width: '100%' } }}
          style={{ fontSize: '1.8rem' }}
          {...inputProps}
        />
      ) : (
        <Text size={1.2} weight={300}>
          태그는 최대 5개까지 설정 가능합니다.
        </Text>
      )}
      {tagList.length === 0 && (
        <Text size={1.2} weight={300}>
          최소 1개 이상의 태그를 선택해주세요.
        </Text>
      )}
    </>
  );
}

export default TagInput;
