import { LinkProps } from 'react-router-dom';

import { Component } from './styles';

const Link: React.FC<LinkProps> = (props) => {
  return (
    <Component {...props}/>
  );
};

export default Link;
