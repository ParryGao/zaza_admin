import {defaultPosts, defaultHomeLabels, defaultLabels} from '@/../mock/daily';

import { getDailyPosts } from '@/services/daily';

const DailyModel = {
  namespace: 'daily',
  state: {
    posts: defaultPosts,
    homeLabels: defaultHomeLabels,
    labels: defaultLabels,
  },
  effects: {
    *getList({ payload }, { call, put }) {
      const response = yield call(getDailyPosts, payload);
      console.log('getDailyPosts::', response);
      // yield put({
      //   type: 'setPosts',
      //   payload: response,
      // });
    },
    *createPost({ payload }, { call, put }) {
      const response = yield call(getDailyPosts, payload);
      // yield put({
      //   type: 'setPosts',
      //   payload: response,
      // }); // Login successfully
      console.log('createPost::', response);
    },
  },
  reducers: {
    /**
     * home labels
    */
    setHomeLabels(state, { payload }) {
      return {
        ...state,
        homeLabels: payload || [],
      };
    },
    addHomeLabels(state, { payload }) {
      if (!payload) {
        return state;
      }
      const newHomeLabels = [].concat(state.homeLabels);
      newHomeLabels.push(payload);
      return {
        ...state,
        homeLabels: newHomeLabels,
      };
    },
    updateHomeLabels(state, { payload }) {
      if (!payload) {
        return state;
      }
      const newHomeLabels = state.homeLabels.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
      return {
        ...state,
        homeLabels: newHomeLabels,
      };
    },
    deleteHomeLabels(state, { payload }) {
      if (!payload) {
        return state;
      }
      const i = state.homeLabels.findIndex((item) => item.id === payload.id);
      const newHomeLabels = [].concat(state.homeLabels);
      if (i > -1 && state.homeLabels.length > i) {
        newHomeLabels.splice(i, 1);
      }
      return {
        ...state,
        homeLabels: newHomeLabels,
      };
    },

    /**
     * labels
    */
    setLabels(state, { payload }) {
      return {
        ...state,
        labels: payload || [],
      };
    },
    addLabels(state, { payload }) {
      if (!payload) {
        return state;
      }
      const newLabels = [].concat(state.labels);
      newLabels.push(payload);
      return {
        ...state,
        labels: newLabels,
      };
    },
    updateLabels(state, { payload }) {
      if (!payload) {
        return state;
      }
      const newLabels = state.labels.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
      return {
        ...state,
        labels: newLabels,
      };
    },
    deleteLabels(state, { payload }) {
      if (!payload) {
        return state;
      }
      const i = state.labels.findIndex((item) => item.id === payload.id);
      const newLabels = [].concat(state.labels);
      if (i > -1 && newLabels.length > i) {
        newLabels.splice(i, 1);
      }
      return {
        ...state,
        labels: newLabels,
      };
    },

    /**
     * posts
    */
    setPosts(state, { payload }) {
      return {
        ...state,
        posts: payload || [],
      };
    },
    addPost(state, { payload }) {
      if (!payload) {
        return state;
      }
      const newPosts = [].concat(state.posts);
      newPosts.push(payload);
      return {
        ...state,
        posts: newPosts,
      };
    },
    updatePost(state, { payload }) {
      if (!payload) {
        return state;
      }
      const newPosts = state.posts.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
      return {
        ...state,
        posts: newPosts,
      };
    },
    deletePost(state, { payload }) {
      if (!payload) {
        return state;
      }
      const i = state.posts.findIndex((item) => item.id === payload.id);
      const newPosts = [].concat(state.posts);
      if (i > -1 && newPosts.length > i) {
        newPosts.splice(i, 1);
      }
      return {
        ...state,
        posts: newPosts,
      };
    },
  },
};
export default DailyModel;
