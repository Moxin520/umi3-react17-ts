import request from 'umi-request';
import { message } from 'antd';

request.interceptors.request.use((url: string, options: any) => {
  return {
    url: `${url}`,
    options: {
      ...options,
      interceptors: true,
      headers: { hello: 'setting yours' },
    },
  };
});

request.interceptors.response.use((response: any) => {
  if (response.status > 400) {
    const codeMaps: any = {
      502: '网关错误',
      503: '服务不可用',
      504: '网关超时',
      404: '未找到',
    };
    message.error(codeMaps[response.status]);
  }

  return response;
});

export default request;
