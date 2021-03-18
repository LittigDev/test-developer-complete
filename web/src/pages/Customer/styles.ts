import styled from 'styled-components';

export const Header = styled.header`
  position: relative;
  display: flex;

  button {
    display: inline;
    margin: 8px;
    width: 100px;
    height: 40px;
  }

  h1{
    display: inline;
    flex: 2;
  }
`;

export const Container = styled.div`
  height: 100vh;
  display: flex inline-block;
  justify-content: center;
  align-items: center;

  svg {
    margin: 8px;
  }
`;
