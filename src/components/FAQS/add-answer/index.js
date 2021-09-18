import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.less';
import { Form, Input, Button, Modal, Select, Upload, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import styles from './index.less';
import { parseImages } from '@/utils/public';

const { Option } = Select;

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

const AnswerCreateModal = ({
  isModalVisible,
  defaluValue,
  onClose,
  onSure,
  users,
}) => {
  const [form] = Form.useForm();
  const [images, setImages] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewImage, setPreviewImage] = useState();

  console.log('defaluValue::', defaluValue);

  useEffect(() => {
    setImages(parseImages(defaluValue && defaluValue.picture));
    if (form) {
      form.setFieldsValue({
        images: parseImages(defaluValue && defaluValue.picture),
        content: get(defaluValue, 'content', ''),
        like: get(defaluValue, 'likeNum', 0),
        comment: get(defaluValue, 'commentNum', 0),
        follow: get(defaluValue, 'collectionNum', 0),
      });
    }
  }, [defaluValue, form]);

  const onCancel = () => {
    form.resetFields();
    onClose();
  };

  const onFinish = (values) => {
    console.log(values);
    onSure({
      content: values.content,
      images: values.images,
      like: values.like,
      comment: values.comment,
      follow: values.follow,
    });
    onCancel();
  };

  const onSelectImages = async (e) => {
    setImages(e.fileList);
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
  
  console.log('images::::', images);

  return (
    <Modal
      visible={isModalVisible}
      footer={null}
      title={defaluValue ? '编辑帖子' : '创建帖子'}
      onCancel={onCancel}
    >
      <div className={styles.question}>
        {get(defaluValue, 'question.content', '')}
      </div>
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
                <Option value={item.objectId} key={item.objectId}>{item.nickname || item.username}</Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item
          name="images"
          label="添加图片"
          getValueFromEvent={normFile}
        >
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            accept=".png,jpg"
            onPreview={handlePreview}
            onChange={onSelectImages}
            maxCount={1}
          >
            {images.length > 0 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          name="content"
          label="回答内容"
          placeholder="填写回答内容"
          rules={[
            {
              required: true,
              message: '请填写回答内容',
              whitespace: true,
            },
          ]}
        >
          <Input />
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

export default AnswerCreateModal;
