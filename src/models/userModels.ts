import { Effect, ImmerReducer, history } from 'umi';
import { getLoginApi, getLogOutApi } from '@/services/user';

export interface UserModelState {
  token: string;
}

export interface UserModelType {
  namespace: 'userModels';
  state: UserModelState;
  effects: {
    getLogin: Effect;
    getLogOut: Effect;
  };
  reducers: {
    // 启用 immer 之后
    setIsLogin: ImmerReducer<UserModelState>;
  };
}

const userModels: UserModelType = {
  namespace: 'userModels',

  state: {
    token: '',
  },

  effects: {
    *getLogin({ payload, callback }, { put, call }) {
      let res = yield call(getLoginApi);
      yield put({
        type: 'setIsLogin',
        payload: res,
      });
      return res;
    },
    *getLogOut({ payload, callback }, { put, call }) {
      let res = yield call(getLogOutApi);
      yield put({
        type: 'setIsLogin',
        payload: res,
      });
      return res;
    },
  },
  reducers: {
    // 启用 immer 之后
    setIsLogin(state, { payload }) {
      window.localStorage.setItem('token', payload.data.token);
      state.token = payload.data.token;
    },
  },
};

export default userModels;
