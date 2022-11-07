import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Component = styled(Link)`
  color: #0745FE;
  font-weight: bold;

  &:hover {
    color: #306bff;
    transition: 0.25s;
  }
`;

