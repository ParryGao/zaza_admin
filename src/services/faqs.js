import Request, { endpoints, METHOD } from '@/utils/request';
import { get } from 'lodash';

export const getQuestions = (params) => {
  return Request(endpoints.questionRecommends, {
    params,
  });
};

export const createQuestion = (params) => {
  return Request(endpoints.question, {
    method: METHOD.POST,
    data: params,
  });
};

export const updateQuestion = (params) => {
  return Request(endpoints.question, {
    method: METHOD.PUT,
    data: params,
  });
};

export const getQuestionDetails = (objectId, callback) => {
  Request(`${endpoints.question}/${objectId}`).then((res) => {
    callback(null, res.data);
  }).catch((error) => {
    callback(error);
  });
};

export const getCurrentAnswers = (params) => {
  return Request(endpoints.answers, {
    params,
  });
};

export const updateAnswer = (params) => {
  return Request(endpoints.answers, {
    method: METHOD.PUT,
    data: params,
  });
};

export const getTopics = (params) => {
  return Request(endpoints.topic, {
    params,
  });
};

export const createUpdateTopic = (params) => {
  return Request(endpoints.topic, {
    method: params.objectId ? METHOD.PUT : METHOD.POST,
    params,
  });
};

export const deleteTopic = (params) => {
  return Request(endpoints.topic, {
    method: METHOD.DEL,
    params,
  });
};
