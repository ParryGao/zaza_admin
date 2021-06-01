import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Space, Button, Modal, Input, message } from 'antd';
import moment from 'moment';
import styles from './index.less';

const { TextArea } = Input;

export default () => {
  const dataSource = [
    {
      key: '1',
      id: '123',
      title: '帖子标题',
      content: '这是帖子内容',
      reportReson: '搬运抄袭',
      createTime: moment(),
      createUser: {
        userName: 'Bill',
      },
    },
    {
      key: '2',
      id: '456',
      title: '帖子标题',
      content: '这是帖子内容',
      reportReson: '违法违规',
      createTime: moment(),
      createUser: {
        userName: 'Bill',
      },
    },
  ];

  const previewAction = () => {
    Modal.info({
      icon: <div />,
      content: <div style={{ width: 500, height: 300 }} className="post-details">这是帖子详情</div>
    });
  };

  const offerLineAction = () => {
    Modal.info({
      icon: <div />,
      title: '请输入下架原因',
      content: (
        <TextArea className={styles.offerLineInput} rows={4} placeholder="请输入" />
      ),
    });
  };

  const noOfferLine = () => {
    message.success('操作成功');
  };

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '帖子标题',
      dataIndex: 'title',
    },
    {
      title: '作者',
      dataIndex: 'createUser',
      render: (createUser) => createUser.userName,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (time) => moment(time).format('YYYY-MM-DD HH:mm:ss'),
      sorter: true,
    },
    {
      title: '举报原因',
      dataIndex: 'reportReson',
      render: (reportReson) => <div style={{ color: 'red' }}>{reportReson}</div>
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="text" style={{ padding: 0, color: 'blue' }} className="classify-tags__actions-edit" onClick={previewAction}>
            预览
          </Button>
          <Button type="text" style={{ padding: 0, color: 'blue' }} className="classify-tags__actions-edit" onClick={offerLineAction}>
            下架
          </Button>
          <Button type="text" style={{ padding: 0, color: 'blue' }} className="classify-tags__actions-edit" onClick={noOfferLine}>
            举报不属实
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title="举报管理"
    >
      <Table
        rowKey="lableId"
        columns={columns}
        dataSource={dataSource}
      />
    </PageContainer>
  );
};
