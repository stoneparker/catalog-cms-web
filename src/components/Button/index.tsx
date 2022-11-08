import type { ButtonProps } from 'antd/es/button';

import { Component } from './styles';

export interface Props extends ButtonProps {
  full?: boolean;
};

const Button: React.FC<Props> = (props) => {
  return (
    <Component {...props} />
  )
}

export default Button;
