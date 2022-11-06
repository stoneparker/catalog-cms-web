import type { ButtonProps } from 'antd/es/button';

import { Component } from './styles';

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <Component {...props} />
  )
}

export default Button;
