import axios, { AxiosResponse } from "axios";

const tokenRefreshVerify = async function(tokenRefresh: string | null): Promise<AxiosResponse> {
  const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
    refresh: JSON.parse(tokenRefresh ? tokenRefresh : '')
  });

  return new Promise(function(resolve, reject) {
    if (response.status !== 200) reject('unauthorized');
    return resolve(response);
  });
}

const tokenAccessVerify = async function(tokenAccess: string): Promise<AxiosResponse> {
  const response = await axios.post('http://127.0.0.1:8000/api/token/verify/', {
    token: tokenAccess
  });

  return new Promise(function(resolve, reject) {
    if (response.status !== 200) reject('unauthorized');
    return resolve(response);
  })
}

export { tokenRefreshVerify, tokenAccessVerify };