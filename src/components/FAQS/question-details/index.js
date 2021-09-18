import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import 'antd/dist/antd.css';
import { Drawer, Space, Avatar } from 'antd';
import { get } from 'lodash';
import moment from 'moment';
import { StarOutlined } from '@ant-design/icons';
import AnswerList from '@/components/FAQS/answer-list';
import { getAuthorInfo } from '@/utils/public';
import AnswerCreateModal from '@/components/FAQS/add-answer';
import styles from './index.less';

const IconText = ({ icon, text }) => (
  <Space className={styles.icontext}>
    {React.createElement(icon)}
    {text}
  </Space>
);

const QuestionDetails = ({
  visible,
  data = {},
  onClose,
  ...props
}) => {
  const { faqs = {}, dispatch, user } = props;
  const { currentAnswers } = faqs;

  const [isModalVisible, setShowModal] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);

  const topics = get(data, 'topics', []);
  const author = getAuthorInfo(data && data.createBy);

  const getAnswers = (page) => {
    dispatch({
      type: 'faqs/getCurrentAnswers',
      payload: {
        objectId: data.objectId,
        page: page || currentAnswers.page || 1,
        size: 10,
      }
    });  
  };

  useEffect(() => {
    if (data) {
      getAnswers(1);
    }
  }, [data]);

  const onEditAnswer = (item) => {
    setCurrentEdit({
      ...item,
      question: data,
    });
    setShowModal(true);
  };

  const onCreateEditResult = (values) => {
    dispatch({
      type: 'faqs/updateAnswer',
      payload: {
        objectId: currentEdit.objectId,
        ...values, 
      }
    })
  };

  return (
    <Drawer
      title="问题详情"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
      width={800}
    >
      <div className={styles.postDetails}>
        {
          data && data.offLineReson && <div className={styles.donwReson}>{`被下架：${data.offLineReson}`}</div>
        }
        <div className={styles.createUser}>
          <Avatar src={author.avatar} />
          <span className={styles.nickName}>{author.name}</span>
        </div>
        <div className={styles.title}>{data && data.title}</div>
        <div className={styles.content}>{data && data.content}</div>
        <div className={styles.labels}>
          {
            topics.map((item) => (
              <div className={styles.labelItem} key={item}>
                {item}
              </div>
            ))
          }
        </div>
        <div className={styles.content}>
          <IconText icon={StarOutlined} text={get(data, 'focusNum', 0)} key="list-vertical-star-o" />
        </div>
        <div className={styles.time}>发布时间：{moment(data && data.createdAt).format('YYYY-MM-DD')}</div>

        <div className={styles.answerTitle}>所有回答：</div>
        <AnswerList
          data={currentAnswers.list}
          onPageChange={getAnswers}
          editAction={onEditAnswer}
        />
        <AnswerCreateModal
          isModalVisible={isModalVisible}
          defaluValue={currentEdit}
          onClose={() => {
            setShowModal(false);
            setCurrentEdit(null);
          }}
          onSure={onCreateEditResult}
          users={user.userList}
        />
      </div>
    </Drawer>
  );
};


export default connect(({ faqs, user }) => ({
  faqs,
  user,
}))(QuestionDetails);
