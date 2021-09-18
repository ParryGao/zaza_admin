import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Modal } from 'antd';

const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 4,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 18,
    },
    sm: {
      span: 18,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 0,
      offset: 10,
    },
    sm: {
      span: 0,
      offset: 10,
    },
  },
};

const OffLineModal = ({
  visible,
  onClose,
  onSure,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSure({
      reson: values.reson,
    });
    form.resetFields();
  };

  const onCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      footer={null}
      title="下架操作"
      onCancel={onCancel}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="label-create"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="reson"
          label="下架原因"
          rules={[
            {
              required: true,
              message: '请输入下架原因',
              whitespace: true,
            },
          ]}
        >
          <TextArea rows={4} />
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

export default  OffLineModal;
