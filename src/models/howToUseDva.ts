import { Effect, ImmerReducer } from 'umi';

export interface IndexModelState {
  name: string;
}

export interface IndexModelType {
  namespace: 'howToUseDva';
  state: IndexModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    // save: Reducer<IndexModelState>;
    // 启用 immer 之后
    save: ImmerReducer<IndexModelState>;
  };
}

const howToUseDva: IndexModelType = {
  namespace: 'howToUseDva',

  state: {
    name: '我是修改前的值',
  },

  effects: {
    *query({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload,
      });
    },
  },
  reducers: {
    // save(state, action) {
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };
    // },
    // 启用 immer 之后
    save(state, action) {
      state.name = action.payload;
    },
  },
};

export default howToUseDva;
