import { addDecorator } from '@storybook/react';
import { initialize, mswDecorator } from 'msw-storybook-addon';

import GlobalStyle from '../src/styles';
import 'antd/dist/antd.less';

initialize();

export const decorators = [mswDecorator];

addDecorator((story) => (
  <>
    <GlobalStyle />
    {story()}
  </>
));

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
