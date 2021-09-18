import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { getDailyHomeLabels } from '@/services/daily';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Table,
  Space,
  Button,
  Modal,
} from 'antd';
import LabelCreateModal from '@/components/Daily/label-modal';
import moment from 'moment';
import publicStyles from '@/pages/public.less';

const HomeLabelManager = (props) => {
  const { daily = {}, dispatch } = props;
  const { homeLabels } = daily;

  const [isModalVisible, setShowModal] = useState(false);

  const [currentEdit, setCurrentEdit] = useState(null);

  useEffect(() => {
    getDailyHomeLabels(dispatch);
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
    console.log('Received values of form: ', values);
    setShowModal(false);
    if (currentEdit) {
      dispatch({
        type: 'daily/updateHomeLabels',
        payload: {
          ...currentEdit,
          ...values,
        },
      });
    } else {
      dispatch({
        type: 'daily/addHomeLabels',
        payload: {
          ...values,
          id: `000000${Math.ceil(Math.random() * 1000)}`,
          type: 0,
        },
      });
    }
  };

  const onDeleteAction = (item) => {
    Modal.confirm({
      title: '提示',
      content: '确认要删除么？',
      onOk: () => {
        dispatch({
          type: 'daily/deleteHomeLabels',
          payload: item,
        });
      },
    });
  };

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
      title: '描述',
      dataIndex: 'describe',
    },
    {
      title: '引用次数',
      dataIndex: 'times',
      render: (value) => value || 0,
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
      title="首页标签管理"
    >
      <div className={publicStyles.header}>
        <Button className={publicStyles.addBtn} type="primary" onClick={addAction}>添加标签</Button>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={homeLabels}
      />
      <LabelCreateModal
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

export default connect(({ daily }) => ({
  daily,
}))(HomeLabelManager);
