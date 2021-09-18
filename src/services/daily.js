import request from '@/utils/request';

export const getDailyPosts = (params) => {
  return request('/post/list', {
    params,
  });
};

export const createPost = (params) => {
  return request('/post/list', {
    method: 'POST',
    data: params,
  });
};

export const updatePost = () => {

};

export const getDailyHomeLabels = (dispatch) => {
  // dispatch({
  //   type: 'daily/setHomeLabels',
  //   payload: [
  //     {
  //       id: '000000001',
  //       title: '热榜',
  //       describe: '标签描述',
  //       type: 0, // 0-首页标签，1-所有标签
  //     },
  //     {
  //       id: '000000002',
  //       title: '知识',
  //       describe: '标签描述2',
  //       type: 0, // 0-首页标签，1-所有标签
  //     },
  //     {
  //       id: '000000003',
  //       title: '职场',
  //       describe: '标签描述3',
  //       type: 0, // 0-首页标签，1-所有标签
  //     },
  //   ],
  // });
};

export const getDailyLabels = (dispatch) => {
  // dispatch({
  //   type: 'daily/setLabels',
  //   payload: [
  //     {
  //       id: '000000001',
  //       title: '心理学',
  //       describe: '标签描述',
  //       type: 1, // 0-首页标签，1-所有标签
  //     },
  //     {
  //       id: '000000002',
  //       title: '财经',
  //       describe: '标签描述2',
  //       type: 1, // 0-首页标签，1-所有标签
  //     },
  //     {
  //       id: '000000003',
  //       title: '时尚',
  //       describe: '标签描述3',
  //       type: 1, // 0-首页标签，1-所有标签
  //     },
  //   ],
  // });
};
