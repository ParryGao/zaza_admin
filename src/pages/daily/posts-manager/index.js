import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { getDailyPosts } from '@/services/daily';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Space, Button, message } from 'antd';
import PostCreateModal from '@/components/Daily/post-add';
import PostDetails from '@/components/Daily/post-details';
import OffLineModal from '@/components/Daily/offline-reson';
import moment from 'moment';
import publicStyles from '@/pages/public.less';

const PostsManager = (props) => {
  const { daily = {}, dispatch } = props;
  const { posts, labels } = daily;

  const [isModalVisible, setShowModal] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);

  const [isPrewing, setPrewing] = useState(false);
  const [currentPrew, setCurrentPrew] = useState(false);


  const [showOfflineModal, setShowOffLineModal] = useState();

  useEffect(() => {
    getDailyPosts(dispatch);
    dispatch({
      type: 'daily/getList',
      payload: {},
    });
  }, []);

  const addAction = () => {
    setShowModal(true);
  };

  const editAction = (item) => {
    setCurrentEdit(item);
    setShowModal(true);
  };

  const onCreateEditResult = (result) => {
    setShowModal(false);
    if (currentEdit) {
      dispatch({
        type: 'daipy/updatePost',
        payload: {
          ...currentEdit,
          ...result,
        },
      });
    } else {
      dispatch({
        type: 'daipy/addPost',
        payload: {
          ...result,
          id: `000000${Math.ceil(Math.random() * 1000)}`,
          status: 1,
        },
      });
    }
  };

  const previewAction = (item) => {
    setCurrentPrew(item);
    setPrewing(true);
  };

  const onOfflineAction = (value) => {
    dispatch({
      type: 'daily/updatePost',
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
        type: 'daily/updatePost',
        payload: {
          ...item,
          status: 1,
          offLineReson: '',
        },
      })
      message.success('操作成功');
    }
  };

  console.log(posts);
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
      render: (status) => status === 1 ? '正常' : '被下架',
    },
    {
      title: '操作',
      key: 'action',
      render: (item) => (
        <Space size="middle">
          <Button type="text" style={{ padding: 0, color: 'blue' }} className="classify-tags__actions-edit" onClick={() => previewAction(item)}>
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
      title="帖子管理"
    >
      <div className={publicStyles.header}>
        <Button className={publicStyles.addBtn} type="primary" onClick={addAction}>创建帖子</Button>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={posts}
        pagination={{
          current: 1,
          pageSize: 10,
          total: 100,
        }}
      />
      <PostCreateModal
        isModalVisible={isModalVisible}
        defaluValue={currentEdit}
        labels={labels}
        users={[]}
        onSure={onCreateEditResult}
        onClose={() => {
          setShowModal(false);
          setCurrentEdit(null);
        }}
      />
      <PostDetails
        visible={isPrewing}
        data={currentPrew}
        onClose={() => {
          setPrewing(false);
          setCurrentPrew(null);
        }}
      />
      <OffLineModal
        visible={showOfflineModal}
        onSure={onOfflineAction}
        onClose={() => {
          setShowOffLineModal(false);
        }}
      />
    </PageContainer>
  );
};

export default connect(({ daily, loading }) => ({
  daily,
  loading: loading.effects['daily/getList'],
}))(PostsManager);
