import styled from '@emotion/styled';

const Line = styled.hr`
  border: none;

  &.vertical {
    position: relative;
    top: -1;
    display: inline-block;
    width: 0.1rem;
    height: 1.3rem;
    vertical-align: middle;
  }

  &.horizontal {
    display: block;
    width: 100%;
    height: 1.3rem;
  }
`;

export { Line };
