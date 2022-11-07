import { Modal } from 'antd';
import { Product } from '../../types/product';

import { Content, Footer } from './styles';

export interface Props {
  product?: Product;
  open: boolean;
  close: () => void;
  children: React.ReactNode;
}

export const ProductDetailModal: React.FC<Props> = ({ product, open, close, children }) => {
  if (!product) return null;

  return (
    <Modal
      title='Product Details'
      footer={null}
      open={open}
      onCancel={close}
    >
      <Content>
        <article>
          <section>
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
          </section>
          <section>
            <span>
              {product.description}
            </span>
          </section>
          <section>
            <span>
              <b>Available quantity:</b> {product.availableQuantity}
            </span>
          </section>
          <section>
            <span>
              <b>Price:</b> ${product.price}
            </span>
          </section>
        </article>
      </Content>

      <Footer>
        { children }
      </Footer>
    </Modal>
  );
}

export default ProductDetailModal;
