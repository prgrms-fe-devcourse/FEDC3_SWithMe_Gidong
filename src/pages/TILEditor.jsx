import { Button, Header, SearchBar, TagInput } from '@/components/base';
import { useTILContext } from '@/context/TILProvider';
import useInput from '@/hooks/useInput';
import { COLOR } from '@/styles/color';
import { checkAbleSubmit } from '@/utils/validation';
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
  const { onCreateTIL } = useTILContext();

  const navigate = useNavigate();
  const {
    state: { til, groupName, groupId },
  } = useLocation();
  const editMode = til ? '수정' : '작성';

  const title = useInput(til ? til.title.title : '');
  const tags = useInput(til ? [...til.title.tagList] : []);
  const editorRef = useRef();

  const ableSubmit = useMemo(
    () => checkAbleSubmit([title.value.length, tags.value.length]),
    [title.value, tags.value.length],
  );

  const handleCancelButtonClick = () => {
    navigate(-1);
  };

  const handleSubmitButtonClick = async () => {
    if (!ableSubmit) return;

    if (til) {
      // TODO: UPDATE TIL API CALL WITH BELOW DATA
      /* 
        PUT /posts/update
        
        token
        
        FormData: data
      */
      // const data = {
      //   postId: til._id,
      //   title: JSON.stringify({
      //     title: title.value,
      //     body: editorRef.current.getInstance().getMarkdown(),
      //     tagsList: tags.value,
      //   }),
      //   channelId: channel._id,
      //   image: null,
      // };
    } else {
      const formData = new FormData();
      formData.append(
        'title',
        JSON.stringify({
          title: title.value,
          body: editorRef.current.getInstance().getMarkdown(),
          tagList: tags.value,
        }),
      );
      formData.append('channelId', groupId);
      formData.append('image', null);

      await onCreateTIL(formData);
      navigate('/myGroup');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <StyledPageWrapper>
      <StyledTILEditor>
        <Header level={1} strong size={40} color={COLOR.DARK}>
          📚 [{til ? til.channel.name : groupName}]에 대한 TIL {editMode}하기
        </Header>
        <SearchBar
          placeholder='제목을 입력하세요.'
          value={title.value}
          onChange={title.onChange}
          label={!title.value.length ? '한 글자 이상 입력해주세요.' : ''}
          wrapperProps={{ style: { width: '60%', margin: '6rem 40% 3rem 0' } }}
          style={{ fontSize: '3rem', backgroundColor: `${COLOR.MY_GROUP_BG}` }}
          icon={+false}
        />
        <div style={{ backgroundColor: `${COLOR.WHITE}` }}>
          <Editor
            initialValue={til ? til.title.body : '여기에서 자유롭게 TIL을 작성하세요!'}
            hideModeSwitch={true}
            height='600px'
            useCommandShortcut={false}
            plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
            placeholder='여기에서 자유롭게 TIL을 작성하세요!'
            ref={editorRef}
          />
        </div>
        <StyledFooterContanier>
          <div style={{ width: '50%' }}>
            <TagInput
              initialTagList={tags.value}
              onChange={(tagList) => tags.onChange(tagList)}
              wrapperProps={{ style: { width: '100%' } }}
              inputProps={{ style: { backgroundColor: COLOR.MY_GROUP_BG } }}
            />
          </div>
          <div>
            <Button
              as='button'
              style={{ fontSize: '2.2rem', padding: '1.3rem 7rem', borderRadius: '1rem' }}
              round={+true}
              onClick={handleCancelButtonClick}>
              취소
            </Button>
            <Button
              as='button'
              disabled={!ableSubmit}
              bgcolor={!ableSubmit ? COLOR.GRAY : COLOR.PRIMARY_BTN}
              color={!ableSubmit ? COLOR.DARK : COLOR.WHITE}
              style={{ fontSize: '2.2rem', padding: '1.3rem 7rem', borderRadius: '1rem', marginLeft: '1rem' }}
              round={+true}
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
  padding: 8rem;
  margin-top: 8rem;
  background-color: ${COLOR.MY_GROUP_BG};

  & > button:not(:last-child) {
    margin-right: 2rem;
  }
`;

const StyledFooterContanier = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 2rem;
  height: 10rem;

  & > div:nth-of-type(1) {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;
