import request from '@/utils/request';
import { stringify } from 'qs'
export async function fetchAccount(params:any): Promise<any> {
    return request(`/api/v1/article?${stringify(params)}`);
}

export async function addAccount(params:any) {
    console.log('params',params)
    return request('/api/v1/article/create', {
      method: params.id ? 'PUT':'POST',
      data:params,
    });
  }
  export async function delAccount(params:any) {
    console.log('params',params)
    return request(`/api/v1/article/${params.id}`, {
      method: 'DELETE',
    });
  }