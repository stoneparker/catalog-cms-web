import { Meta, StoryObj } from '@storybook/react';

import ProductDetail, { Props } from '.';

export default {
  title: 'Components/ProductDetail',
  component: ProductDetail,
} as Meta<Props>

export const Default: StoryObj<Props> = {
  args: {
    imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MKU93_VW_34FR+watch-40-alum-starlight-nc-se_VW_34FR_WF_CO_GEO_BR?wid=750&hei=712&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1632171039000%2C1661754104691',
    description: 'A pulseira esportiva é feita de fluorelastômero resistente e surpreendentemente macio e vem com um fecho inovador, em forma de pino.',
    name: 'Apple Watch',
  }
};
