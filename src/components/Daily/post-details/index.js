import React from 'react';
import 'antd/dist/antd.css';
import './index.less';
import { Drawer, Carousel, Space, Avatar } from 'antd';
import styles from './index.less';
import { get } from 'lodash';
import moment from 'moment';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const IconText = ({ icon, text }) => (
  <Space className={styles.icontext}>
    {React.createElement(icon)}
    {text}
  </Space>
);

const PostDetails = ({
  visible,
  data = {},
  onClose,
}) => {
  const images = get(data, 'images', []);
  const labels = get(data, 'labels', []);
  return (
    <Drawer
      title="帖子详情"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
      width={500}
    >
      {
        data && data.offLineReson && <div className={styles.donwReson}>{`被下架：${data.offLineReson}`}</div>
      }
      <div className={styles.createUser}>
        <Avatar src={get(data, 'createUser.avatar', '')} />
        <span className={styles.nickName}>{get(data, 'createUser.userName', '')}</span>
      </div>
      <div className={styles.postDetails}>
        <Carousel autoplay className={styles.banner}>
          {
            images.map((item) => (
              <div className={styles.imageItem} key={item.url}>
                <img className={styles.image} src={item.url} alt="banner" />
              </div>
            ))
          }
        </Carousel>
        <div className={styles.title}>{data && data.title}</div>
        <div className={styles.content}>{data && data.content}</div>
        <div className={styles.labels}>
          {
            labels.map((item) => (
              <div className={styles.labelItem} key={item.id}>
                {item.title}
              </div>
            ))
          }
        </div>
        <div className={styles.content}>
          <IconText icon={LikeOutlined} text={data ? data.like : 0} key="list-vertical-like-o" />
          <IconText icon={StarOutlined} text={data ? data.follow : 0} key="list-vertical-star-o" />
          <IconText icon={MessageOutlined} text={data ? data.comment : 0} key="list-vertical-message" />
        </div>
        <div className={styles.time}>发布时间：{moment().format('YYYY-MM-DD')}</div>
      </div>
    </Drawer>
  );
};



export default  PostDetails;
