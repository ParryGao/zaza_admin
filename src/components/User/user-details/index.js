import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Drawer, Space, Avatar } from 'antd';
import { get } from 'lodash';
import moment from 'moment';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import styles from './index.less';

const IconText = ({ icon, text }) => (
  <Space className={styles.icontext}>
    {React.createElement(icon)}
    {text}
  </Space>
);

const listData = [];
for (let i = 0; i < 23; i+=1) {
  listData.push({
    href: 'https://ant.design',
    title: '花木子',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const UserDetails = ({
  visible,
  data = {},
  onClose,
}) => {
  useEffect(() => {
    
  }, [data]);

  console.log(data);
  return (
    <Drawer
      title="答案详情"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
      width={500}
    >
      <div className={styles.postDetails}>
        {
          data && data.offLineReson && <div className={styles.donwReson}>{`被下架：${data.offLineReson}`}</div>
        }
        <div className={styles.createUser}>
          <Avatar src={get(data, 'createUser.avatar', '')} />
          <span className={styles.nickName}>{get(data, 'createUser.userName', '匿名')}</span>
        </div>
        <img
          width={272}
          alt="logo"
          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
        />
        <div className={styles.title}>{data && data.title}</div>
        <div className={styles.content}>{data && data.content}</div>
        <div className={styles.content}>
          <IconText icon={LikeOutlined} text={get(data, 'like', 0)} key="list-vertical-like-o" />
          <IconText icon={StarOutlined} text={get(data, 'follow', 0)} key="list-vertical-star-o" />
          <IconText icon={MessageOutlined} text={get(data, 'comment', 0)} key="list-vertical-message" />
        </div>
        <div className={styles.time}>发布时间：{moment().format('YYYY-MM-DD')}</div>
      </div>
    </Drawer>
  );
};


export default UserDetails;
