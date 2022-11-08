import { Meta, StoryObj } from '@storybook/react';

import Button, { Props } from '.';

export default {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
  }
} as Meta<Props>

export const Default: StoryObj<Props> = {};

export const Primary: StoryObj<Props> = {
  args: {
    type: 'primary',
  }
};

export const Full: StoryObj<Props> = {
  args: {
    full: true,
  }
};

