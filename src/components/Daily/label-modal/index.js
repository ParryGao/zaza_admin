import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.less';
import { Form, Input, Button, Modal } from 'antd';

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

const LabelCreateModal = ({
  isModalVisible,
  defaluValue,
  onClose,
  onSure,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (form && isModalVisible) {
      form.setFieldsValue({
        label: defaluValue ? defaluValue.title : '',
        describe: defaluValue ? defaluValue.describe : '',
      });
    }
  }, [defaluValue, form, isModalVisible]);

  const onFinish = (values) => {
    onSure({
      title: values.label,
      describe: values.describe,
    });
    form.resetFields();
  };

  const onCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      visible={isModalVisible}
      footer={null}
      title={defaluValue ? '编辑标签' : '创建标签'}
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

        <Form.Item
          name="describe"
          label="标签描述"
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
