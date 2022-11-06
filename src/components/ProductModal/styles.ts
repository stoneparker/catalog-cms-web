import styled from 'styled-components';

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  img {
    width: 120px;
    height: 120px;
    object-fit: contain;
    border: 1px solid #eee;
    border-radius: 8px;
    margin-right: 10px;
    background-color: #fff;
  }
`;
