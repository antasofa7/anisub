import axios from 'axios';

export default async function callAPI({url, method, data}) {
  const response = await axios({
    url,
    method,
    data,
  }).catch(err => console.log('err >>', err));

  const axiosResponse = response.data;

  if (response.status > 300) {
    const res = {
      error: true,
      message: axiosResponse.message,
      data: null,
    };
    return res;
  }

  const res = {
    error: false,
    message: 'success',
    data: axiosResponse.data,
  };

  return res;
}
