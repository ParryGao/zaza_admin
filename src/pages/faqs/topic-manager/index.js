import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Table,
  Space,
  Button,
  Modal,
} from 'antd';
import TopicCreateModal from '@/components/FAQS/add-topic';
import moment from 'moment';
import publicStyles from '@/pages/public.less';

const TopicManager = (props) => {
  const { faqs = {}, dispatch } = props;
  const { topics } = faqs;

  const [isModalVisible, setShowModal] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);

  const getData = (page) => {
    dispatch({
      type: 'faqs/getTopics',
      payload: {
        page: page || topics.page || 1,
        size: 10,
      },
    });
  };

  useEffect(() => {
    getData(1);
  }, []);

  const addAction = () => {
    setCurrentEdit(null);
    setShowModal(true);
  };

  const onEditAction = (item) => {
    setCurrentEdit(item);
    setShowModal(true);
  };

  const onCreateEditResult = (values) => {
    setShowModal(false);
    dispatch({
      type: 'faqs/addUpdateTopic',
      payload: currentEdit && currentEdit.objectId ? {
        objectId: currentEdit.objectId,
        ...values,
      } : values,
    })
  };

  const onDeleteAction = (item) => {
    Modal.confirm({
      title: '提示',
      content: '确认要删除么？',
      onOk: () => {
        dispatch({
          type: 'faqs/deleteTopicAction',
          payload: item,
        });
      },
    });
  };

  const columns = [
    {
      title: '编号',
      dataIndex: 'objectId',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '引用次数',
      dataIndex: 'times',
      render: (value) => value || 0,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      render: (time) => moment(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      render: (item) => (
        <Space size="middle">
          <Button type="text" style={{ padding: 0, color: 'blue' }} className="classify-tags__actions-edit" onClick={() => onEditAction(item)}>
            编辑
          </Button>
          <Button type="text" style={{ padding: 0, color: 'blue' }} className="classify-tags__actions-edit" onClick={() => onDeleteAction(item)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title="话题管理"
    >
      <div className={publicStyles.header}>
        <Button className={publicStyles.addBtn} type="primary" onClick={addAction}>添加话题</Button>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={topics.list}
        pagination={{
          current: topics.page,
          pageSize: topics.size,
          total: topics.total,
        }}
        onChange={(e) => getData(e.current)}
      />
      <TopicCreateModal
        isModalVisible={isModalVisible}
        defaluValue={currentEdit}
        onSure={onCreateEditResult}
        onClose={() => {
          setShowModal(false);
        }}
      />
    </PageContainer>
  );
};

export default connect(({ faqs }) => ({
  faqs,
}))(TopicManager);
