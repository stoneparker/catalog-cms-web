import styled from 'styled-components';
import { Input } from 'antd';

export const Component = styled(Input)`
  border-radius: 8px;

  &:not([type=textarea]), .ant-input {
    min-height: 40px;
  }

  span.ant-input-prefix {
    color: #b6b6b6;
  }
`;
