import { useMemo, useState } from 'react';
import { Table as AntdTable, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PreloadedQuery, usePreloadedQuery, useMutation } from 'react-relay';
// @ts-ignore
import graphql from 'babel-plugin-relay/macro';

import ProductDetails from '../ProductDetails';
import TableActions from '../TableActions';
import ProductDetailsModal from '../ProductDetailsModal';
import { Product, ShowModalProps } from '../../types/product';
import getErrorMessage from '../../utils/getErrorMessage';

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
  const [showDetailsModal, setShowDetailsModal] = useState<ShowModalProps>({ show: false });

  const data = usePreloadedQuery<typeof productsQuery>(productsQuery, queryReference);
  
  const filteredProducts = useMemo(() => (
    data.listProducts.filter((product: Product) => {
      const filter = productsFilter.toLowerCase();

      return (
        product.name.toLowerCase().includes(filter) ||
        product.barcode.toLowerCase().includes(filter)
      )
    })
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
          onCompleted() {
            loadQuery();
          },
          onError(error) {
            console.log(error);
            Modal.error({
              title: 'Ops...',
              content: getErrorMessage(error),
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
        <ProductDetails
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
      responsive: ['sm'],
    },
    {
      title: 'Available quantity',
      dataIndex: 'availableQuantity',
      key: 'availableQuantity',
      responsive: ['sm'],
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (value) => <span>${value}</span>,
      responsive: ['sm'],
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
      responsive: ['sm'],
    },
    {
      title: 'Options',
      key: 'options',
      render: (_, record) => (
        <TableActions
          options={[
            { title: 'Details', action: () => setShowDetailsModal({ show: true, product: record }) },
          ]}
        />
      ),
      responsive: ['xs'],
    },
  ];

  return (
    <>
      <AntdTable
        columns={columns}
        dataSource={filteredProducts}
        pagination={false}
      />
      <ProductDetailsModal
        open={showDetailsModal.show}
        product={showDetailsModal.product}
        close={() => setShowDetailsModal({ show: false })}
      >
        <TableActions
          options={[
            { title: 'Edit', action: () => {
              setShowDetailsModal({ show: false });
              editProduct(showDetailsModal.product!);
            }},
            { title: 'Delete', action: () => {
              setShowDetailsModal({ show: false});
              deleteProduct(showDetailsModal.product!._id);
            }, loading: isInFlight }
          ]}
        />
      </ProductDetailsModal>
    </>
  )
}

export default Table;
