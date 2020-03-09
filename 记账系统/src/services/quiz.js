import request from '@/utils/request';
import { stringify} from 'qs'
export async function queryShop(params) {
  return request(`/api/shop?${stringify(params)}`);
}

export async function createShop(params={}) {
    console.log('params',params)
    let { id } = params;
    return request('/api/shop', {
      method: id?'PUT':'POST',
      data:params
    //   'Content-Type':'application/json'
    });
  } 

  export async function delShop(params) {
    console.log('params',params)
    return request(`/api/shop?id=${params}`, {
      method: 'DELETE',
      data:params
    //   'Content-Type':'application/json'
    });
  } 