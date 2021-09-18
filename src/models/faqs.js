import {
  getQuestions, createQuestion, updateQuestion,
  getCurrentAnswers, updateAnswer,
  getTopics, createUpdateTopic, deleteTopic,
} from '@/services/faqs';
import { message } from 'antd';
import { get } from 'lodash';

const FAQSModel = {
  namespace: 'faqs',
  state: {
    questions: {},
    topics: {},
    currentAnswers: {},
    answers: {},
  },
  effects: {
    *getQuestions({ payload }, { call, put }) {
      const res = yield call(getQuestions, payload);
      yield put({
        type: 'setQuestions',
        payload: get(res, 'data', {}),
      });
    },
    *createQuestion({ payload }, { call, put }) {
      const res = yield call(createQuestion, payload);
      if (res.success === 1) {
        yield put({
          type: 'getQuestions',
          payload: {
            page: 1,
            size: 10,
          },
        });
        message.success('创建成功');
      } else if (res.msg) {
        message.error(res.msg);
      }
    },
    *updateQuestionAction({ payload }, { call, put }) {
      const res = yield call(updateQuestion, payload);
      if (res.success === 1) {
        yield put({
          type: 'updateQuestion',
          payload,
        });
        message.success('更新成功');
      } else if (res.msg) {
        message.error(res.msg);
      }
    },
    *getCurrentAnswers({ payload }, { call, put }) {
      const res = yield call(getCurrentAnswers, payload);
      yield put({
        type: 'setCurrentAnswers',
        payload: get(res, 'data', {}),
      });
    },
    *updateAnswer({ payload }, { call, put }) {
      const res = yield call(updateAnswer, payload);
      yield put({
        type: 'updateAnswer',
        payload: get(res, 'data', {}),
      });
    },
    *getTopics({ payload }, { call, put }) {
      const res = yield call(getTopics, payload);
      if (res.success === 1 && res.data) {
        yield put({
          type: 'setTopics',
          payload: get(res, 'data', {}),
        });
      }
    },
    *addUpdateTopic({ payload }, { call, put }) {
      const res = yield call(createUpdateTopic, payload);
      if (res.success === 1 && res.data) {
        if (payload.objectId) {
          yield put({
            type: 'addTopic',
            payload: get(res, 'data', {}),
          });
        } else {
          yield put({
            type: 'updateTopic',
            payload: get(res, 'data', {}),
          });
        }
      }
    },
    *deleteTopicAction({ payload }, { call, put }) {
      const res = yield call(deleteTopic, payload);
      if (res.success === 1 && res.data) {
        yield put({
          type: 'deleteTopic',
          payload,
        });
      }
    }
  },
  reducers: {
    /**
     * questions
    */
    setQuestions(state, { payload }) {
      return {
        ...state,
        questions: payload || {},
      };
    },
    addQuestion() {
      
    },
    updateQuestion(state, { payload }) {
      if (!payload) {
        return state;
      }
      const newQuestions = {
        ...state.questions, 
      }
      newQuestions.list = newQuestions.list.map((item) => {
        if (item.objectId === payload.objectId) {
          return {
            ...item,
            ...payload,
          };
        }
        return item;
      });
      return {
        ...state,
        questions: newQuestions,
      };
    },
    deleteQuestion(state, { payload }) {
      if (!payload) {
        return state;
      }
      const newQuestions = {
        ...state.questions, 
      }
      const i = newQuestions.list.findIndex((item) => item.objectId === payload.objectId);
      newQuestions.list = [].concat(newQuestions.list);
      if (i > -1 && newQuestions.list.length > i) {
        newQuestions.list.splice(i, 1);
      }
      return {
        ...state,
        questions: newQuestions,
      };
    },

    /**
     * answers
     */
    setCurrentAnswers(state, { payload }) {
      return {
        ...state,
        currentAnswers: payload || [],
      };
    },
    updateAnswer(state, { payload }) {
      if (!payload) {
        return state;
      }
      const newCurrentAnswers = {
        ...state.currentAnswers, 
      }
      newCurrentAnswers.list = newCurrentAnswers.list.map((item) => {
        if (item.objectId === payload.objectId) {
          return {
            ...item,
            ...payload,
          };
        }
        return item;
      });

      const newAnswers = {
        ...state.answers, 
      };
      newAnswers.list = newAnswers.list.map((item) => {
        if (item.objectId === payload.objectId) {
          return {
            ...item,
            ...payload,
          };
        }
        return item;
      });
      return {
        ...state,
        currentAnswers: newCurrentAnswers,
        answers: newAnswers,
      };
    },

    /**
     * topics
    */
    setTopics(state, { payload }) {
      return {
        ...state,
        topics: payload || {},
      };
    },
    addTopic(state, { payload }) {
      if (!payload) {
        return state;
      }
      const newTopics = [].concat(state.topics);
      newTopics.push(payload);
      return {
        ...state,
        topics: newTopics,
      };
    },
    updateTopic(state, { payload }) {
      if (!payload) {
        return state;
      }
      const newTopics = state.topics.map((item) => {
        if (item.objectId === payload.objectId) {
          return payload;
        }
        return item;
      });
      return {
        ...state,
        topics: newTopics,
      };
    },
    deleteTopic(state, { payload }) {
      if (!payload) {
        return state;
      }
      const i = state.topics.findIndex((item) => item.objectId === payload.objectId);
      const newTopics = [].concat(state.topics);
      if (i > -1 && state.topics.length > i) {
        newTopics.splice(i, 1);
      }
      return {
        ...state,
        topics: newTopics,
      };
    },

  },
};
export default FAQSModel;
