import { useEffect } from 'react';
import { Modal, Form, Row, Col } from 'antd';

import Input from '../Input';

import { Product } from '../../types/product';

import { ImageWrapper } from './styles';

export interface Props {
  product?: Product,
  open: boolean,
  close: (reloadList: boolean) => void,
}

const ProductModal: React.FC<Props> = ({ open, product, close }) => {
  const [form] = Form.useForm();

  const imageUrl = Form.useWatch('imageUrl', form);
  const name = Form.useWatch('name', form);

  function handleOk() {
    form
      .validateFields()
      .then((values) => {
        if (product) {
          // use update mutation
          alert(`Updating: ${product.name}`);
        } else {
          // use creation mutation
          alert(`Creating: ${values.name}`);
        }

        form.resetFields();
        close(true);
      })
      .catch((info) => {
        console.log('Validate failed :', info);
      });
  }

  function handleCancel() {
    form.resetFields();
    close(false);
  }

  useEffect(() => {
    form.setFieldsValue(product)
   }, [form, product]);

  return (
    <Modal
      destroyOnClose={true}
      open={open}
      title={`${product ? 'Edit' : 'New'} product`}
      onOk={handleOk}
      onCancel={handleCancel}

    >
      <Form
        form={form}
        name='product-modal_form'
      >
        <Row gutter={12}>
          <Col span={16}>
            <Form.Item
              name='name'
              label='Name'
              labelCol={{ span: 24 }}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name='barcode'
              label='Barcode'
              labelCol={{ span: 24 }}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name='description'
          label='Description'
          labelCol={{ span: 24 }}
        >
          <Input type='textarea' />
        </Form.Item>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              name='price'
              label='Price'
              labelCol={{ span: 24 }}
            >
              <Input addonBefore="R$" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name='availableQuantity'
              label='Available quantity'
              labelCol={{ span: 24 }}
            >
              <Input type='number' />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name='imageUrl'
          label='Image URL'
          labelCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>

        <ImageWrapper>
          <img src={imageUrl || 'https://genesisairway.com/wp-content/uploads/2019/05/no-image.jpg'} alt={`${name || 'Product'} preview`} />
        </ImageWrapper>
      </Form>
    </Modal>
  )
}

export default ProductModal;
