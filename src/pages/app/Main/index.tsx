import { Suspense, useEffect, useState } from 'react';
import { PlusSquareFilled, SearchOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

import { useQueryLoader } from 'react-relay';
import { Product } from '../../../types/product';

import ProductModal from '../../../components/ProductModal';
import Table ,{ productsQuery } from '../../../components/Table';
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
  // const data = useLazyLoadQuery(
  //   productsQuery,
  //   { },
  //   { fetchPolicy: 'network-only' },
  // );

  const [queryReference, loadQuery] = useQueryLoader(
    productsQuery,
  );

  useEffect(() => {
    loadQuery({});
  }, [loadQuery]);

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
          { queryReference &&
            <Suspense fallback={'Loading products...'}>
              <Table
                queryReference={queryReference}
                deleteProduct={deleteProduct}
                editProduct={editProduct}
              />
            </Suspense>
          }
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
