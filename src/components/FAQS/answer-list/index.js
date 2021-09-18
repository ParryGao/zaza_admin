import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, List, Avatar } from 'antd';
import AnswerDetails from '@/components/FAQS/answer-details';
import { getAuthorInfo, parseImages } from '@/utils/public';
import { get } from 'lodash';
import styles from './index.less';

const AnswerList = ({
  data,
  onPageChange,
  editAction,
  switchOnLineStatus,
}) => {
  const [showAnswer, setShowAnswer] = useState(null);

  const preview = (item) => {
    setShowAnswer(item);
  };

  return (
    <div className={styles.contain}>
      <List
        rowKey="objectId"
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            onPageChange(page);
          },
          pageSize: 10,
        }}
        dataSource={data}
        
        renderItem={(item) => {
          const authorUser = getAuthorInfo(item.createBy);
          const images = parseImages(item.picture);
          const cover = get(images, '[0].url');
          return (
            <List.Item
              key={item.id}
              actions={[
                <Button key="preview" type="text" style={{ padding: 0, color: 'blue' }} onClick={() => preview(item)}>
                  预览
                </Button>,
                <Button key="edit" type="text" style={{ padding: 0, color: 'blue' }} onClick={() => editAction(item)}>
                  编辑
                </Button>,
                <Button key="change-status" type="text" style={{ padding: 0, color: 'blue' }} onClick={() => switchOnLineStatus(item)}>
                  {item.status === 0 ? '上架' : '下架'}
                </Button>,
              ]}
            >
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {
                  cover && (
                    <img
                      width={272}
                      alt="cover"
                      src={cover}
                    />
                  )
                }
                <div style={{ marginLeft: 15 }}>
                  <List.Item.Meta
                    avatar={<Avatar src={authorUser.avatar} />}
                    title={authorUser.name}
                  />
                  {item.content}
                </div>
              </div>
            </List.Item>
          );
        }}
      />
      <AnswerDetails
        visible={!!showAnswer}
        data={showAnswer}
        onClose={() => {
          setShowAnswer(null);
        }}
      />
    </div>
  );
};



export default AnswerList;
