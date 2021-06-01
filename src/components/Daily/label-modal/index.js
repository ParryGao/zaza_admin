import React from 'react';
import 'antd/dist/antd.css';
import './index.less';
import { Form, Input, Button, Modal } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 0,
    },
    sm: {
      span: 0,
    },
  },
  wrapperCol: {
    xs: {
      span: 0,
    },
    sm: {
      span: 0,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const LabelCreateModal = ({
  isModalVisible,
  defaluValue,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Modal
      visible={isModalVisible}
      footer={null}
      title="创建标签"
    >
      <Form
        {...formItemLayout}
        form={form}
        name="label-create"
        onFinish={onFinish}
        initialValues={{
          label: defaluValue || '',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="label"
          label="标签名称"
          rules={[
            {
              required: true,
              message: '请输入标签名',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            确认
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default  LabelCreateModal;
