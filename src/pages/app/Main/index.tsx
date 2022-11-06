import { Suspense, useEffect, useState } from 'react';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

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
} from './styles';

const Products: React.FC = () => {
  const [showProductModal, setShowProductModal] = useState<{ show: boolean, product?: Product }>({ show: false });

  const [queryReference, loadQuery] = useQueryLoader(
    productsQuery,
  );

  useEffect(() => {
    loadQuery({});
  }, [loadQuery]);

  function reloadList() {
    loadQuery({}, { fetchPolicy: 'network-only' });
  }

  function handleCloseModal(reloadList: boolean) {
    if (reloadList) loadQuery({});

    setShowProductModal({ show: false });
  }

  function editProduct(product: Product) {
    setShowProductModal({ show: true, product });
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
              icon={<PlusOutlined />}
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
        <main>
          { queryReference &&
            <Suspense fallback={'Loading products...'}>
              <Table
                queryReference={queryReference}
                loadQuery={reloadList}
                editProduct={editProduct}
              />
            </Suspense>
          }
        </main>
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
