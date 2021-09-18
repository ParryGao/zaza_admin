import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button } from 'antd';
import AnswerList from '@/components/FAQS/answer-list';
import AnswerCreateModal from '@/components/FAQS/add-answer';
import publicStyles from '@/pages/public.less';

const listData = [];
for (let i = 0; i < 23; i+=1) {
  listData.push({
    id: i + 10000000,
    href: 'https://ant.design',
    createUser: {
      nickName: '花木子',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    title: '日常饮食，日本十五都很新鲜安全，味道也很不错。只是种类比较少，但好在有华人超市、华人开的中华料理。给你推荐几家',
    content:
      '当事乘客桂先生报警，称自己是网络视频中的当事人，可他却并没有接到任何网约车司机寻求帮助的电话和信息，警方随即介入调查。经过警方核实，医院当时给艾先生的',
  });
}

export default () => {
  const [isModalVisible, setShowModal] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);

  const [currentPrew, setCurrentPrew] = useState(false);

  const addAction = () => {
    setShowModal(true);
  };

  const editAction = (item) => {
    setCurrentEdit(item);
    setShowModal(true);
  };

  const onCreateEditResult = (result) => {
    
  };

  const switchOnLineStatus = (item) => {

  };

  return (
    <PageContainer
      title="回答管理"
    >
      <div className={publicStyles.header}>
        <Button className={publicStyles.addBtn} type="primary" onClick={addAction}>创建回答</Button>
      </div>
      <AnswerList
        data={listData}
        editAction={editAction}
        switchOnLineStatus={switchOnLineStatus}
      />
      <AnswerCreateModal
        isModalVisible={isModalVisible}
        defaluValue={currentEdit}
        onClose={() => {
          setShowModal(false);
          setCurrentEdit(null);
        }}
        onSure={onCreateEditResult}
        users={[]}
      />
    </PageContainer>
  );
};
