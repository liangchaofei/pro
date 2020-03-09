import * as account from '@/services/account';
import { Model } from 'dva';
const eventModel: Model = {
    namespace: 'account',
    state: {
      data: []  
    },
    effects: {
      *getAccount({ payload, callback }, { call, put }) {
        const res = yield call(account.fetchAccount, payload);
        yield put({
          type: 'save',
          payload: res
        });
      },
    //   add
    *addAccount({ payload }, { call, put }) {
        const res = yield call(account.addAccount, payload);
        console.log('res',res)
      },
    //   del
    *delAccount({ payload }, { call, put }) {
        const res = yield call(account.delAccount, payload);
        console.log('res',res)
      },
    },
    reducers: {
      save(state, action: any) {
        return {
          ...state,
          data:action.payload,
        };
      },
    },
    subscriptions: {
      // setup({ dispatch, history }) {
      //   return history.listen(({ pathname }) => {
      //     const re = pathToRegexp('/eventplatform/event');
      //     const regTest = re.exec(pathname);
      //     if (regTest) {
      //       dispatch({ type: 'list', payload: getUrlParams() });
      //     }
      //   });
      // },
    },
  };
  
  export default eventModel;
  