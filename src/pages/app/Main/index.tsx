import { Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

import { useQueryLoader } from 'react-relay';
import { Product, ShowModalProps } from '../../../types/product';

import { RootState } from '../../../reducers/store';
import { logout } from '../../../reducers/auth/actions';

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
  const [showProductModal, setShowProductModal] = useState<ShowModalProps>({ show: false });
  const [productsFilter, setProductsFilter] = useState('');

  const { user } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const [queryReference, loadQuery] = useQueryLoader(
    productsQuery,
  );

  useEffect(() => {
    loadQuery({});
  }, [loadQuery]);

  function reloadList() {
    loadQuery({}, { fetchPolicy: 'network-only' });
  }

  function handleCloseModal(reload: boolean) {
    if (reload) reloadList();

    setShowProductModal({ show: false });
  }

  function editProduct(product: Product) {
    setShowProductModal({ show: true, product });
  }
  
  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <Container>
      <Content>
        <Header>
          <article>
            <div>
              <span id='salutation'>Hello, {user?.name}!</span> 
              <h1>Products</h1>
            </div>
            <Button size='small' onClick={handleLogout}>Log out</Button>
          </article>
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
              value={productsFilter}
              onChange={(e) => setProductsFilter(e.target.value)}
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
                productsFilter={productsFilter}
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
