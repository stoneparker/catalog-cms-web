import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 55% 45%;
  background-color: #F7F7FA;

  height: 100vh;

  aside, main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  aside img {
    max-width: 75%;
  }
`;

export const Main = styled.main`
  h1 {
    font-weight: bold;
    font-size: 1.5rem;
    color: #434343;
  }

  article {
    width: 70%;
    background-color: #fff;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
  }
`
