import * as quiz from '@/services/quiz';
import { message } from 'antd';

export default {
  namespace: 'quiz',

  state: {
    data:[]
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(quiz.queryShop, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *create({ payload }, { call, put }) {
        const response = yield call(quiz.createShop, payload);
        console.log('req',response)
        if(response.code == 200){
            message.success('成功')
        }else{
            message.error('失败')
        }
      },
      *delete({ payload }, { call, put }) {
        const response = yield call(quiz.delShop, payload);
        if(response.code == 200){
            message.success('删除成功')
        }else{
            message.error('删除失败')
        }
      },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
