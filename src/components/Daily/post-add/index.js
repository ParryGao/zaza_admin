import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.less';
import { Form, Input, Button, Modal, Select, Upload, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
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

const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const PostCreateModal = ({
  isModalVisible,
  defaluValue,
  onClose,
  onSure,
  labels = [],
  users,
}) => {
  const [form] = Form.useForm();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewImage, setPreviewImage] = useState();

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
      title: values.label,
      content: values.content,
      topics: values.topics,
      images: values.images,
    });
    form.resetFields();
  };

  const onCancel = () => {
    form.resetFields();
    onClose();
  };

  const handlePreview = async (file) => {
    const fileObj = file;
    if (!fileObj.url && !fileObj.preview) {
      fileObj.preview = await getBase64(fileObj.originFileObj);
    }

    setPreviewImage(fileObj.url || fileObj.preview);
    setPreviewTitle(fileObj.name || fileObj.url.substring(fileObj.url.lastIndexOf('/') + 1));
    setPreviewVisible(true);
  };

  return (
    <Modal
      visible={isModalVisible}
      footer={null}
      title={defaluValue ? '????????????' : '????????????'}
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
          label="????????????"
          rules={[
            {
              required: true,
              message: '???????????????',
            },
          ]}
        >
          <Select placeholder="???????????????">
            {
              users.map((item) => (
                <Option value={item.id} key={item.id}>{item.name}</Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item
          name="images"
          label="????????????"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: '???????????????????????????',
              type: 'array',
            },
          ]}
        >
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            onPreview={handlePreview}
            multiple
            maxCount={9}
          >
            {get(form, 'images', []).length >= 8 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          name="title"
          label="??????"
          placeholder="???????????????"
          rules={[
            {
              required: true,
              message: '???????????????',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="content"
          label="??????"
          placeholder="???????????????"
          rules={[
            {
              required: true,
              message: '???????????????',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="topics"
          label="????????????????????????"
          rules={[
            {
              required: true,
              message: '???????????????????????????',
              type: 'array',
            },
          ]}
        >
          <Select mode="multiple" placeholder="???????????????">
            {
              labels.map((item) => (
                <Option value={item.id} key={item.id}>{item.title}</Option>
              ))
            }
          </Select>
        </Form.Item>

        {
          defaluValue && (
            <Form.Item
              name="like"
              label="????????????"
              placeholder="?????????????????????"
            >
              <InputNumber />
            </Form.Item>
          )
        }

        {
          defaluValue && (
            <Form.Item
              name="comment"
              label="????????????"
              placeholder="?????????????????????"
            >
              <InputNumber />
            </Form.Item>
          )
        }

        {
          defaluValue && (
            <Form.Item
              name="follow"
              label="????????????"
              placeholder="?????????????????????"
            >
              <InputNumber />
            </Form.Item>
          )
        }

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            ??????
          </Button>
        </Form.Item>
      </Form>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </Modal>
  );
};

export default PostCreateModal;
