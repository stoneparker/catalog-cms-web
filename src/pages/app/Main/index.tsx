import type { ColumnsType } from 'antd/es/table';
import { PlusSquareFilled, SearchOutlined } from '@ant-design/icons';
import { Table } from 'antd';

import { products } from '../../../mocks/products';
import { Product } from '../../../types/product';

import ProductDetail from '../../../components/ProductDetail';
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
  function editProduct(id: string) {
    alert('edit product');
  }

  function deleteProduct(id: string) {
    alert('delete product');
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
            { title: 'Edit', action: () => editProduct(record._id) },
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
            <Button type='primary' icon={<PlusSquareFilled />}>
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
    </Container>
  )
}

export default Products;
