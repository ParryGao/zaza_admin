import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import moment from 'moment';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Space, Button, message } from 'antd';
import QuestionCreateModal from '@/components/FAQS/add-question';
import QuestionDetails from '@/components/FAQS/question-details';
import publicStyles from '@/pages/public.less';

const UserManager = (props) => {
  const { user = {}, dispatch,  } = props;
  const { userList } = user;

  const [isModalVisible, setShowModal] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);

  const [isPrewing, setPrewing] = useState(false);
  const [currentPrew, setCurrentPrew] = useState(false);

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
    console.log('result:::', result);
    if (currentEdit) {
      dispatch({
        type: 'faqs/updateQuestion',
        payload: {
          ...result,
          objectId: currentEdit.objectId,
        },
      });
    } else {
      dispatch({
        type: 'faqs/createQuestion',
        payload: result,
      });
    }
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
    message.success('提交成功');
  };

  const switchOnLineStatus = (item) => {
    if (item.status === 1) {
      setCurrentEdit(item);
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
      dataIndex: 'objectId',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      render: (avatar) => <img src={avatar || ''} />,
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
      title="用户管理"
    >
      <div className={publicStyles.header}>
        <Button className={publicStyles.addBtn} type="primary" onClick={addAction}>创建用户</Button>
      </div>
      <Table
        rowKey="objectId"
        columns={columns}
        dataSource={userList}
      />
    </PageContainer>
  );
};

export default connect(({ user }) => ({
  user,
}))(UserManager);
