import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
    border: 1px solid #eee;
    border-radius: 8px;
    margin-right: 10px;
    background-color: #fff;
  }

  div.product-detail__sider {
    h3 {
      margin: 0;
      font-weight: bold;
      color: #52525D;
      font-size: 1rem;
    }

    span {
      color: #B2B2B7;
      display: inline-block;
      max-width: 250px;
      vertical-align: bottom;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    @media (max-width: 575px) {
      span { display: none };
    }
  }
`;
