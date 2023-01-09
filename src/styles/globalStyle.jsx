import { Global, css } from '@emotion/react';
import emotionReset from 'emotion-reset';

const style = css`
  ${emotionReset}

  html {
    font-size: 62.5%;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }

  * {
    box-sizing: border-box;
  }

  body,
  button,
  input {
    font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
      'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  }

  select,
  input,
  button,
  textarea {
    border: 0;
    outline: 0;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
    background-color: transparent;
  }
`;

const GlobalStyle = () => {
  return <Global styles={style} />;
};

export default GlobalStyle;
