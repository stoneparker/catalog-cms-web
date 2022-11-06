import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100%;
  padding: 50px 0;
  background-color: #F7F7FA;
`;

export const Content = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  width: 70%;
`;

export const Header = styled.header`
  margin-bottom: 40px;

  span#salutation {
    text-transform: uppercase;
    font-size: 0.75rem;
    color: #9E9EA4;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

export const Main = styled.main``;

