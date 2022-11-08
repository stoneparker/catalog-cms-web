import { Meta, StoryObj } from '@storybook/react';

import Button, { Props } from '.';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta<Props>

export const Default: StoryObj<Props> = {
  args: {
    children: 'Button',
  }
};

export const Primary: StoryObj<Props> = {
  args: {
    children: 'Button',
    type: 'primary',
  }
};

export const Full: StoryObj<Props> = {
  args: {
    children: 'Button',
    full: true,
  }
};

