import React, { useEffect, useState } from 'react';
import { connect, history } from 'umi';
import moment from 'moment';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Space, Button, message } from 'antd';
import QuestionCreateModal from '@/components/FAQS/add-question';
import QuestionDetails from '@/components/FAQS/question-details';
import publicStyles from '@/pages/public.less';
import { getQuestionDetails } from '@/services/faqs';

const QuestionManager = (props) => {
  const { faqs = {}, dispatch, user } = props;
  const { questions, topics } = faqs;

  const [isModalVisible, setShowModal] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);

  const [isPrewing, setPrewing] = useState(false);
  const [currentPrew, setCurrentPrew] = useState(false);

  const [showOfflineModal, setShowOffLineModal] = useState();

  const getData = (page) => {
    dispatch({
      type: 'faqs/getQuestions',
      payload: {
        page: page || topics.page || 1,
        size: 10,
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: 'faqs/getTopics',
      payload: {
        page: 1,
        size: 100,
      },
    });
    getData(1);
  }, []);

  const addAction = () => {
    setCurrentEdit(null);
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
        type: 'faqs/updateQuestionAction',
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
    setShowModal(false);
  };

  const preview = (item) => {
    setPrewing(true);
    // setCurrentPrew(item);
    getQuestionDetails(item.objectId, (error, res) => {
      if (error) {
        message.error(error.message);
      } else if (res) {
        setCurrentPrew(res);
      }
    });
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
    message.success('????????????');
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
      message.success('????????????');
    }
  };

  const columns = [
    {
      title: '??????',
      dataIndex: 'objectId',
    },
    {
      title: '??????',
      dataIndex: 'title',
    },
    {
      title: '??????',
      dataIndex: 'createBy',
      render: (createBy) => createBy.username,
    },
    {
      title: '????????????',
      dataIndex: 'createdAt',
      render: (time) => moment(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '??????',
      dataIndex: 'status',
      render: (status) => '',
    },
    {
      title: '??????',
      key: 'action',
      render: (item) => (
        <Space size="middle">
          <Button type="text" style={{ padding: 0, color: 'blue' }} className="classify-tags__actions-edit" onClick={() => preview(item)}>
            ??????
          </Button>
          <Button type="text" style={{ padding: 0, color: 'blue' }} className="classify-tags__actions-edit" onClick={() => editAction(item)}>
            ??????
          </Button>
          <Button type="text" style={{ padding: 0, color: 'blue' }} className="classify-tags__actions-edit" onClick={() => switchOnLineStatus(item)}>
            {item.status === 0 ? '??????' : '??????'}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title="????????????"
    >
      <div className={publicStyles.header}>
        <Button className={publicStyles.addBtn} type="primary" onClick={addAction}>????????????</Button>
      </div>
      <Table
        rowKey="objectId"
        columns={columns}
        dataSource={questions.list}
        pagination={{
          current: questions.page,
          pageSize: questions.size,
          total: questions.total,
        }}
        onChange={(e) => getData(e.current)}
      />
      <QuestionCreateModal
        isModalVisible={isModalVisible}
        defaluValue={currentEdit}
        onClose={() => {
          setShowModal(false);
          setCurrentEdit(null);
        }}
        onSure={onCreateEditResult}
        labels={topics.list}
        users={user.userList}
      />
      <QuestionDetails
        visible={isPrewing}
        data={currentPrew}
        onClose={() => {
          setPrewing(false);
          setCurrentPrew(null);
        }}
      />
    </PageContainer>
  );
};

export default connect(({ faqs, user }) => ({
  faqs,
  user,
}))(QuestionManager);
