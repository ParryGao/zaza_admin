import { userLogin, getUserProfile } from '@/services/user';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import { history } from 'umi';
import { stringify } from 'querystring';
import { setAuthority } from '@/utils/authority';
import Cookies from 'js-cookie'
import { get } from 'lodash';

const UserModel = {
  namespace: 'user',
  state: {
    isLogin: 0,
    currentUser: {},
    userList: [
      {
        "interests": [
          "学习",
          "体育",
          "科技"
        ],
        "username": "aissue",
        "gender": "男",
        "likeNum": 0,
        "status": "1",
        "createdAt": "2021-07-14T14:18:37.284Z",
        "updatedAt": "2021-07-14T14:18:37.284Z",
        "ACL": {
          "*": {
            "read": true
          },
          "2VrJ27W8kt": {
            "read": true,
            "write": true
          }
        },
        "sessionToken": "r:886bb1812ea7112e8e4bc93cab458961",
        "fanCount": 0,
        "idolCount": 0,
        "objectId": "2VrJ27W8kt"
      }
    ],
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(userLogin, payload);
  
      if (response.success === 1) {
        yield put({
          type: 'user/changeLoginStatus',
          payload: response,
        }); // Login successfully
        put({
          type: 'user/saveCurrentUser',
          payload: response.data,
        });

        Cookies.set('sessiontoken', get(response, 'data.sessionToken'));
        const urlParams = new URL(window.location.href);
        const queryParams = getPageQuery();
        message.success('🎉 🎉 🎉  登录成功！');
        let { redirect } = queryParams;
  
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
  
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
  
            if (window.routerBase !== '/') {
              redirect = redirect.replace(window.routerBase, '/');
            }
  
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
  
        history.replace(redirect || '/');
      } else {
        message.error(response.msg);
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/auth/login' && !redirect) {
        history.replace({
          pathname: '/auth/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(getUserProfile);
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority || 'admin'); // TODO:
      return { ...state, status: payload.success === 1 };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
