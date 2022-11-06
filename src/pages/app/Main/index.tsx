import { useState } from 'react';

import type { ColumnsType } from 'antd/es/table';
import { PlusSquareFilled, SearchOutlined } from '@ant-design/icons';
import { Table, Modal } from 'antd';

import { products } from '../../../mocks/products';
import { Product } from '../../../types/product';

import ProductDetail from '../../../components/ProductDetail';
import ProductModal from '../../../components/ProductModal';
import TableActions from '../../../components/TableActions';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

import {
  Container,
  Content,
  Header,
  HeaderActions,
  Main,
} from './styles';

const Products: React.FC = () => {
  const [showProductModal, setShowProductModal] = useState<{ show: boolean, product?: Product }>({ show: false });

  function handleCloseModal(reloadList: boolean) {
    // use query to reload list
    setShowProductModal({ show: false });
  }

  function editProduct(product: Product) {
    setShowProductModal({ show: true, product });
  }

  function deleteProduct(id: string) {
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this product? This action cannot be reversed.',
      onOk: () => {
        alert('deletedProduct');
        // usemutation - get all products after deletion
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
    <Container>
      <Content>
        <Header>
          <span id='salutation'>Hello, Lorem!</span> 
          <h1>Products</h1>
          <HeaderActions>
            <Button
              type='primary'
              icon={<PlusSquareFilled />}
              onClick={() => setShowProductModal({ show: true })}
            >
              NEW PRODUCT
            </Button>
            <Input
              style={{ width: '40%' }}
              placeholder='Search...'
              prefix={<SearchOutlined />}
            />
          </HeaderActions>
        </Header>
        <Main>
          <Table
            columns={columns}
            dataSource={products}
            pagination={false}
          />
        </Main>
      </Content>
      <ProductModal
        open={showProductModal.show}
        product={showProductModal.product}
        close={(reloadList: boolean) => handleCloseModal(reloadList)}
      />
    </Container>
  )
}

export default Products;
