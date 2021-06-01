import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Space, Button, Modal, message, Input } from 'antd';
import moment from 'moment';
import styles from './index.less';

const { TextArea } = Input;

const POST_STATUS = {
  ON_LINE: '正常状态',
  OFF_LINE: '被强制下线',
};

export default () => {
  const dataSource = [
    {
      key: '1',
      id: '123',
      title: '帖子标题',
      content: '这是帖子内容',
      status: POST_STATUS.ON_LINE,
      createTime: moment(),
      createUser: {
        userName: 'Bill',
      },
    },
    {
      key: '3',
      id: '789',
      title: '帖子标题',
      content: '这是帖子内容',
      status: POST_STATUS.OFF_LINE,
      createTime: moment(),
      createUser: {
        userName: 'Cindy',
      },
    }
  ];

  const previewAction = () => {
    Modal.info({
      icon: <div />,
      content: <div style={{ width: 500, height: 300 }} className="post-details">这是帖子详情</div>
    });
  };

  const editAction = () => {

  };

  const switchOnLineStatus = (item) => {
    if (item.status === POST_STATUS.ON_LINE) {
      Modal.info({
        icon: <div />,
        title: '请输入下架原因',
        content: (
          <TextArea className={styles.offerLineInput} rows={4} placeholder="请输入" />
        ),
      });
    } else {
      message.success('操作成功');
    }
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
      title: '状态',
      dataIndex: 'status',
      render: (status) => {
        switch (status) {
          case POST_STATUS.ON_LINE:
            return '正常';
          case POST_STATUS.BLOCKED:
            return '被举报';
          case POST_STATUS.OFF_LINE:
            return '已被强制下架';
          default:
            break;
        }
        return '';
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (item) => (
        <Space size="middle">
          <Button type="text" style={{ padding: 0, color: 'blue' }} className="classify-tags__actions-edit" onClick={previewAction}>
            预览
          </Button>
          <Button type="text" style={{ padding: 0, color: 'blue' }} className="classify-tags__actions-edit" onClick={editAction}>
            编辑
          </Button>
          <Button type="text" style={{ padding: 0, color: 'blue' }} className="classify-tags__actions-edit" onClick={() => switchOnLineStatus(item)}>
            {item.status === POST_STATUS.OFF_LINE ? '上架' : '下架'}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title="帖子管理"
    >
      <Table
        rowKey="lableId"
        columns={columns}
        dataSource={dataSource}
      />
    </PageContainer>
  );
};
