import { Meta, StoryObj } from '@storybook/react';
import type { InputProps } from 'antd/es/input';

import Input from '.';

export default {
  title: 'Components/Input',
  component: Input,
} as Meta<InputProps>;

export const Default: StoryObj<InputProps> = {
  args: {
    placeholder: 'Search...',
  }
};
