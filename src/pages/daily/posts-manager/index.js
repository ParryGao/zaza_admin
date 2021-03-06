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
    message.success('ζδΊ€ζε');
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
      message.success('ζδ½ζε');
    }
  };

  console.log(posts);
  const columns = [
    {
      title: 'ηΌε·',
      dataIndex: 'id',
    },
    {
      title: 'εΈε­ζ ι’',
      dataIndex: 'title',
    },
    {
      title: 'δ½θ',
      dataIndex: 'createUser',
      render: (createUser) => createUser.userName,
    },
    {
      title: 'εε»ΊζΆι΄',
      dataIndex: 'createTime',
      render: (time) => moment(time).format('YYYY-MM-DD HH:mm:ss'),
      sorter: true,
    },
    {
      title: 'ηΆζ',
      dataIndex: 'status',
      render: (status) => status === 1 ? 'ζ­£εΈΈ' : 'θ’«δΈζΆ',
    },
    {
      title: 'ζδ½',
      key: 'action',
      render: (item) => (
        <Space size="middle">
          <Button type="text" style={{ padding: 0, color: 'blue' }} className="classify-tags__actions-edit" onClick={() => previewAction(item)}>
            ι’θ§
          </Button>
          <Button type="text" style={{ padding: 0, color: 'blue' }} className="classify-tags__actions-edit" onClick={() => editAction(item)}>
            ηΌθΎ
          </Button>
          <Button type="text" style={{ padding: 0, color: 'blue' }} className="classify-tags__actions-edit" onClick={() => switchOnLineStatus(item)}>
            {item.status === 0 ? 'δΈζΆ' : 'δΈζΆ'}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title="εΈε­η?‘η"
    >
      <div className={publicStyles.header}>
        <Button className={publicStyles.addBtn} type="primary" onClick={addAction}>εε»ΊεΈε­</Button>
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
