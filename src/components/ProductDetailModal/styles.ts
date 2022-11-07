import styled from 'styled-components';

export const Content = styled.main`
  article {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  section {
    display: flex;
    align-items: center;
  }

  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    border: 1px solid #eee;
    border-radius: 8px;
    margin-right: 10px;
    background-color: #fff;
  }

  h3 {
    margin: 0;
    font-weight: bold;
    color: #52525D;
    font-size: 1rem;
  }

  span {
    color: #434343;
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
`;
