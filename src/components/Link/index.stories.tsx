import { Meta, StoryObj } from '@storybook/react';
import { LinkProps, BrowserRouter } from 'react-router-dom';

import Link from '.';

export default {
  title: 'Components/Link',
  component: Link,
  decorators: [
    (Story) => (
      <BrowserRouter>
        {Story()}
      </BrowserRouter>
    )
  ]
} as Meta<LinkProps>

export const Default: StoryObj<LinkProps> = {
  args: {
    children: 'Click here',
  }
};
