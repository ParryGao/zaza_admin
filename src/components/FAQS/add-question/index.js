import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.less';
import { Form, Input, Button, Modal, Select, InputNumber } from 'antd';
import { get } from 'lodash';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 7,
    },
    sm: {
      span: 7,
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

const QuestionCreateModal = ({
  isModalVisible,
  defaluValue,
  onClose,
  onSure,
  labels = [],
  users,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (form) {
      form.setFieldsValue({
        title: get(defaluValue, 'title', ''),
        content: get(defaluValue, 'content', ''),
        topics: get(defaluValue, 'topics', []),
        like: get(defaluValue, 'like', 0),
        comment: get(defaluValue, 'comment', 0),
        follow: get(defaluValue, 'follow', 0),
      });
    }
  }, [defaluValue, form]);

  const onFinish = (values) => {
    onSure({
      userId: values.user,
      title: values.title,
      content: values.content,
      topics: values.topics,
      like: values.like || 0,
      comment: values.comment || 0,
      follow: values.follow || 0,
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
      title={defaluValue ? '编辑问题' : '创建问题'}
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
          name="user"
          label="用户选择"
          rules={[
            {
              required: true,
              message: '请选择用户',
            },
          ]}
        >
          <Select placeholder="请选择用户">
            {
              users.map((item) => (
                <Option value={item.objectId} key={item.objectId}>{item.username}</Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item
          name="title"
          label="问题"
          placeholder="请输入问题"
          rules={[
            {
              required: true,
              message: '请输入问题',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="content"
          label="问题描述"
          placeholder="请输入问题描述"
          rules={[
            {
              required: true,
              message: '请输入问题描述',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="topics"
          label="参与话题（多选）"
          rules={[
            {
              required: true,
              message: '请至少选择一个话题',
              type: 'array',
              min: 1,
            },
            {
              message: '请最多选择5个话题',
              type: 'array',
              max: 5,
            },
          ]}
        >
          <Select mode="multiple" placeholder="请选择话题">
            {
              labels.map((item) => (
                <Option value={item.objectId} key={item.objectId}>{item.name}</Option>
              ))
            }
          </Select>
        </Form.Item>

        {
          defaluValue && (
            <Form.Item
              name="like"
              label="点赞数量"
              placeholder="请输入点赞数量"
            >
              <InputNumber />
            </Form.Item>
          )
        }

        {
          defaluValue && (
            <Form.Item
              name="comment"
              label="评论数量"
              placeholder="请输入评论数量"
            >
              <InputNumber />
            </Form.Item>
          )
        }

        {
          defaluValue && (
            <Form.Item
              name="follow"
              label="收藏数量"
              placeholder="请输入收藏数量"
            >
              <InputNumber />
            </Form.Item>
          )
        }

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            确认
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default QuestionCreateModal;
