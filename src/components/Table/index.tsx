import { useMemo } from 'react';
import { Table as AntdTable, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PreloadedQuery, usePreloadedQuery, useMutation } from 'react-relay';
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
  editProduct: (product: Product) => void;
  queryReference: PreloadedQuery<typeof productsQuery>;
  loadQuery: () => void;
  productsFilter: string;
}

const Table: React.FC<Props> = ({ editProduct, queryReference, loadQuery, productsFilter }) => {
  const data = usePreloadedQuery<typeof productsQuery>(productsQuery, queryReference);
  
  const filteredProducts = useMemo(() => (
    data.listProducts.filter((product: Product) => (
      product.name.includes(productsFilter) ||
      product.barcode.includes(productsFilter)
    ))
  ), [data.listProducts, productsFilter]);

  const [commit, isInFlight] = useMutation(graphql`
    mutation Table_delete_Mutation($data: DeleteProductInput!) {
      deleteProduct(data: $data) {
        _id,
      }
    }
  `);

  function deleteProduct(_id: string) {
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this product? This action cannot be reversed.',
      onOk: () => {
        commit({
          variables: {
            data: { _id },
          },
          onCompleted(response: any, errors) {
            loadQuery();
          },
          onError(error) {
            console.log(error);
            Modal.error({
              title: 'Ops...',
              content: 'Cannot delete product. Try again later.',
            });
          }
        });
      },
    });
  }

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
      render: (value) => <span>${value}</span>
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <TableActions
          options={[
            { title: 'Edit', action: () => editProduct(record) },
            { title: 'Delete', action: () => deleteProduct(record._id), loading: isInFlight }
          ]}
        />
      ),
    },
  ];

  return (
    <AntdTable
      columns={columns}
      dataSource={filteredProducts}
      pagination={false}
    />
  )
}

export default Table;
