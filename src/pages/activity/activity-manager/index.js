import React, { useEffect, useState } from 'react';
import { connect, history } from 'umi';
import moment from 'moment';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Space, Button, message } from 'antd';
import publicStyles from '@/pages/public.less';

const ActivityManager = (props) => {
  const { activity = {}, dispatch } = props;
  const { activities } = activity;

  const [isModalVisible, setShowModal] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);

  const [isPrewing, setPrewing] = useState(false);
  const [currentPrew, setCurrentPrew] = useState(false);


  const [showOfflineModal, setShowOffLineModal] = useState();

  useEffect(() => {

  }, []);

  const addAction = () => {
    setShowModal(true);
  };

  const editAction = (item) => {
    setCurrentEdit(item);
    setShowModal(true);
  };

  const onCreateEditResult = (result) => {
    
  };

  const preview = (item) => {
    setPrewing(true);
    setCurrentPrew(item);
  };

  const onOfflineAction = (value) => {
    dispatch({
      type: 'faqs/updateQuestion',
      payload: {
        ...currentEdit,
        status: 0,
        offLineReson: value.reson,
      },
    });
    setShowOffLineModal(false);
    message.success('提交成功');
  };

  const switchOnLineStatus = (item) => {
    if (item.status === 1) {
      setCurrentEdit(item);
      setShowOffLineModal(true);
    } else {
      dispatch({
        type: 'faqs/updateQuestion',
        payload: {
          ...item,
          status: 1,
          offLineReson: '',
        },
      })
      message.success('操作成功');
    }
  };

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '活动标题',
      dataIndex: 'title',
    },
    {
      title: '活动创建者',
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
      render: (status) => status === 1 ? '正常' : '被下架',
    },
    {
      title: '操作',
      key: 'action',
      render: (item) => (
        <Space size="middle">
          <Button type="text" style={{ padding: 0, color: 'blue' }} className="classify-tags__actions-edit" onClick={() => preview(item)}>
            预览
          </Button>
          <Button type="text" style={{ padding: 0, color: 'blue' }} className="classify-tags__actions-edit" onClick={() => editAction(item)}>
            编辑
          </Button>
          <Button type="text" style={{ padding: 0, color: 'blue' }} className="classify-tags__actions-edit" onClick={() => switchOnLineStatus(item)}>
            {item.status === 0 ? '上架' : '下架'}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title="活动管理"
    >
      <div className={publicStyles.header}>
        <Button className={publicStyles.addBtn} type="primary" onClick={addAction}>创建活动</Button>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={activities}
      />
    </PageContainer>
  );
};

export default connect(({ activity }) => ({
  activity,
}))(ActivityManager);
