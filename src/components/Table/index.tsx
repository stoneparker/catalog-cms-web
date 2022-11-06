import { Table as AntdTable } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
// @ts-ignore
import graphql from 'babel-plugin-relay/macro';

import ProductDetail from '../ProductDetail';
import TableActions from '../TableActions';
import { Product } from '../../types/product';

export const productsQuery = graphql`
  query TableQuery {
    listProducts {
      _id
      name
      barcode
      price
      availableQuantity
      description
      imageUrl
    }
  }
`;

export interface Props {
  deleteProduct: (id: string) => void;
  editProduct: (product: Product) => void;
  queryReference: PreloadedQuery<typeof productsQuery>;
}

const Table: React.FC<Props> = ({ deleteProduct, editProduct, queryReference }) => {
  const data = usePreloadedQuery<typeof productsQuery>(productsQuery, queryReference);

  console.log({ data });

  const columns: ColumnsType<Product> = [
    {
      title: 'Product details',
      key: 'productDetails',
      dataIndex: 'name',
      render: (_, record) => (
        <ProductDetail
          imageUrl={record.imageUrl}
          description={record.description}
          name={record.name}
        />
      ),
    },
    {
      title: 'Barcode',
      dataIndex: 'barcode',
      key: 'barcode',
    },
    {
      title: 'Available quantity',
      dataIndex: 'availableQuantity',
      key: 'availableQuantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <TableActions
          options={[
            { title: 'Edit', action: () => editProduct(record) },
            { title: 'Delete', action: () => deleteProduct(record._id) }
          ]}
        />
      ),
    },
  ];

  return (
    <AntdTable
      columns={columns}
      dataSource={data.listProducts}
      pagination={false}
    />
  )
}

export default Table;
