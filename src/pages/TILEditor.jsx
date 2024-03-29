import { Button, Heading, Input, TagInput } from '@/components/base';

import { useCreateTIL, useUpdateTIL } from '@/hooks/queries/tils';
import useInput from '@/hooks/useInput';

import { checkAbleSubmit } from '@/utils/validation';

import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

import { useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import 'tui-color-picker/dist/tui-color-picker.css';

function TILEditor() {
  const navigate = useNavigate();
  const {
    state: { til, groupName, groupId },
  } = useLocation();
  const editMode = til ? '수정' : '작성';

  const updateTIL = useUpdateTIL();
  const createTIL = useCreateTIL();

  const title = useInput(til ? til.title.title : '');
  const tagList = useInput(til ? [...til.title.tagList] : []);
  const editorRef = useRef();

  const ableSubmit = useMemo(
    () => checkAbleSubmit([title.value.length, tagList.value.length]),
    [title.value, tagList.value.length],
  );

  const handleCancelButtonClick = () => {
    navigate(-1);
  };

  const handleSubmitButtonClick = async () => {
    if (!ableSubmit) return;

    const formData = new FormData();
    formData.append(
      'title',
      JSON.stringify({
        title: title.value,
        body: editorRef.current.getInstance().getMarkdown(),
        tagList: tagList.value,
      }),
    );

    if (til) {
      formData.append('postId', til._id);
      formData.append('channelId', til.channel._id);
      formData.append('image', null);

      await updateTIL.mutate(formData, {
        onSuccess: (data) => navigate(`/TIL/${til._id}`, { state: { til: data } }),
      });

      return;
    }

    formData.append('channelId', groupId);
    formData.append('image', null);

    await createTIL.mutate(formData, { onSuccess: () => navigate('/myGroup') });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <StyledPageWrapper>
      <StyledTILEditor>
        <Heading level={1}>
          📚 [{til ? til.channel.name : groupName}]에 대한 TIL {editMode}하기
        </Heading>
        <Input
          placeholder='제목을 입력하세요.'
          value={title.value}
          onChange={title.onChange}
          label={!title.value.length ? '한 글자 이상 입력해주세요.' : ''}
          fontSize='large'
          block
        />
        <EditorWrapper>
          <Editor
            initialValue={til ? til.title.body : '여기에서 자유롭게 TIL을 작성하세요!'}
            hideModeSwitch={true}
            height='600px'
            useCommandShortcut={false}
            plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
            placeholder='여기에서 자유롭게 TIL을 작성하세요!'
            ref={editorRef}
          />
        </EditorWrapper>
        <StyledFooterContanier>
          <div>
            <TagInput tagList={tagList.value} onChange={tagList.onChange} />
          </div>
          <div>
            <Button
              version='grayInverted'
              fontSize='xLarge'
              size='full'
              shape='round'
              onClick={handleCancelButtonClick}>
              취소
            </Button>
            <Button
              fontSize='xLarge'
              size='full'
              shape='round'
              disabled={!ableSubmit}
              onClick={handleSubmitButtonClick}>
              {editMode}
            </Button>
          </div>
        </StyledFooterContanier>
      </StyledTILEditor>
    </StyledPageWrapper>
  );
}

export default TILEditor;

const StyledPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledTILEditor = styled.div`
  position: relative;
  flex: 1;
  padding: 16rem 8rem 8rem 8rem;

  @media (max-width: 624px) {
    padding: 16rem 4rem 8rem 4rem;
  }

  background-color: ${COLOR.MY_GROUP_BG};

  & > button:not(:last-child) {
    margin-right: 2rem;
  }

  & > div:first-of-type {
    width: 60%;
    margin: 4rem 0 3rem 0;

    @media (max-width: 624px) {
      width: 100%;
    }
  }
`;

const StyledFooterContanier = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 2rem;
  height: 14rem;
  flex-wrap: wrap;
  gap: 3rem;

  & > div:nth-of-type(1) {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex: 1 1 50rem;

    & > div:first-of-type {
      width: 100%;
    }
  }

  & > div:nth-of-type(2) {
    display: flex;
    justify-content: flex-end;
    flex: 1 1 40rem;

    gap: 3rem;
  }
`;

const EditorWrapper = styled.div`
  background-color: ${COLOR.WHITE};
`;
