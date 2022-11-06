import type { ButtonProps } from 'antd/es/button';

import { Component } from './styles';

export interface Props {
  full?: boolean;
}

const Button: React.FC<ButtonProps & Props> = (props) => {
  return (
    <Component {...props} />
  )
}

export default Button;
