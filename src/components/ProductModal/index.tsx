import { useEffect } from 'react';
import { Modal, Form, Row, Col } from 'antd';
import { useMutation } from 'react-relay';
// @ts-ignore
import graphql from 'babel-plugin-relay/macro';

import Input from '../Input';

import { Product } from '../../types/product';

import { ImageWrapper } from './styles';

export interface Props {
  product?: Product;
  open: boolean;
  close: (reloadList: boolean) => void;
}

const ProductModal: React.FC<Props> = ({ open, product, close }) => {
  const [form] = Form.useForm();

  const imageUrl = Form.useWatch('imageUrl', form);
  const name = Form.useWatch('name', form);

  const [commit_new, isInFlight_new] = useMutation(graphql`
    mutation ProductModal_new_Mutation($data: ProductInput!) {
      createProduct(data: $data) {
        _id,
      }
    }
  `);

  const [commit_update, isInFlight_update] = useMutation(graphql`
    mutation ProductModal_update_Mutation($data: ProductModelInput!) {
      updateProduct(data: $data) {
        _id,
      }
    }
  `);

  function createProduct(values: any) {
    commit_new({
      variables: {
        data: values,
      },
      onCompleted() {
        form.resetFields();
        close(true);
      },
      onError(error) {
        console.log(error);
        Modal.error({
          title: 'Ops...',
          content: 'Already exists a product with that name or barcode',
        });
      }
    });
  }

  function updateProduct(values: any) {
    if (!product) return;
  
    commit_update({
      variables: {
        data: { ...values, _id: product._id },
      },
      onCompleted() {
        form.resetFields();
        close(true);
      },
      onError(error) {
        console.log(error);
        Modal.error({
          title: 'Ops...',
          content: 'Product not exists or already exists a product with that name or barcode',
        });
      }
    });
  }

  function handleOk() {
    form
      .validateFields()
      .then((values) => {
        values.availableQuantity = Number(values.availableQuantity);
        console.log(values);
        if (product)
          return updateProduct(values);

        createProduct(values);
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
      confirmLoading={isInFlight_new || isInFlight_update}

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
