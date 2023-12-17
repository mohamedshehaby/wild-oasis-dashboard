import styled, { css } from 'styled-components';

const Heading = styled.h1`
  ${(props) => {
    if (props.as === 'h1') {
      return css`
        font-size: 3rem;
        font-weight: 600;
      `;
    }
    if (props.as === 'h2') {
      return css`
        font-size: 2rem;
        font-weight: 600;
      `;
    }
    if (props.as === 'h3') {
      return css`
        font-size: 2rem;
        font-weight: 500;
      `;
    }
    if (props.as === 'h4') {
      return css`
        font-size: 3rem;
        font-weight: 600;
        text-align: center;
      `;
    }
  }}
  line-height: 1.7;
`;

export default Heading;
