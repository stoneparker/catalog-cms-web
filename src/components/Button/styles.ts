import styled from 'styled-components';
import { Button } from 'antd';

import { Props } from './';

export const Component = styled(Button)<Props>`
  height: 40px;
  width: ${(props) => props.full ? '100%' : 'auto'};
`;
