import { Meta, StoryObj } from '@storybook/react';

import TableActions, { Props } from '.';

export default {
  title: 'Components/TableActions',
  component: TableActions,
} as Meta<Props>

export const Default: StoryObj<Props> = {
  args: {
    options: [
      { title: 'Edit', action: () => {}},
      { title: 'Delete', action: () => {}, loading: false }
    ]
  }
};
