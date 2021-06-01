import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Space, Button, Modal, Input } from 'antd';
import moment from 'moment';
import styles from './index.less';

export default () => {

  const deleteAction = () => {

  };

  const addAction = () => {
    Modal.info({
      icon: <div />,
      title: '创建标签',
      content: (
        <Input className={styles.labelInput} placeholder="请输入标签名称" />
      ),
    });
  };

  const dataSource = [
    {
      key: '1',
      id: '123',
      title: '视频',
      times: 100,
      createTime: moment(),
    },
    {
      key: '2',
      id: '456',
      title: '直播',
      times: 999,
      createTime: moment(),
    },
  ];

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'title',
    },
    {
      title: '引用次数',
      dataIndex: 'times',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (time) => moment(time).format('YYYY-MM-DD HH:mm:ss'),
      sorter: true,
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="text" style={{ padding: 0, color: 'blue' }} className="classify-tags__actions-edit" onClick={deleteAction}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title="标签管理"
    >
      <div className={styles.header}>
        <Button className={styles.addBtn} onClick={addAction}>添加标签</Button>
      </div>
      <Table
        rowKey="lableId"
        columns={columns}
        dataSource={dataSource}
      />
    </PageContainer>
  );
};
