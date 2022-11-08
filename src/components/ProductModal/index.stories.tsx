import { Meta, StoryObj } from '@storybook/react';
import { graphql } from 'msw';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

import RelayEnvironment from '../../services/RelayEnv';

import ProductModal, { Props } from '.';

export default {
  title: 'Components/ProductModal',
  component: ProductModal,
  decorators: [
    (Story) => (
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        {Story()}
      </RelayEnvironmentProvider>
    )
  ],
  parameters: {
    msw: {
      handlers: [
        graphql.mutation('ProductModal_new_Mutation', (req, res, ctx) => {
          return res(
            ctx.data({ _id: '183928719' }),
          )
        }),
        graphql.mutation('ProductModal_update_Mutation', (req, res, ctx) => {
          return res(
            ctx.data({ _id: '183928719' }),
          )
        }),
      ]
    }
  },
  args: {
    open: true,
    close: () => {},
  }
} as Meta<Props>

export const EditProduct: StoryObj<Props> = {
  args: {
    product: {
      imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MKU93_VW_34FR+watch-40-alum-starlight-nc-se_VW_34FR_WF_CO_GEO_BR?wid=750&hei=712&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1632171039000%2C1661754104691',
      description: 'A pulseira esportiva é feita de fluorelastômero resistente e surpreendentemente macio e vem com um fecho inovador, em forma de pino.',
      name: 'Apple Watch',
      price: 1234,
      _id: '283i183hf892',
      availableQuantity: 12,
      barcode: '12hdf92j',
    },
  }
};

export const CreateProduct: StoryObj<Props> = {};

