import { Container } from './styles';

export interface Props {
  imageUrl: string;
  name: string;
  description: string;
}

const ProductDetail: React.FC<Props> = ({ imageUrl, name, description }) => {
  return (
    <Container>
      <img src={imageUrl} alt={name} />
      <div className='product-detail__sider'>
        <h3>{name}</h3>
        <span title={description}>{description}</span>
      </div>
    </Container>
  )
}

export default ProductDetail;
