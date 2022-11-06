import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Component = styled(Link)`
  color: #1890ff;
  font-weight: bold;

  &:hover {
    color: #1890ff;
    transition: 0.25s;
  }
`;

