import {authHeader} from '../Theme/Constants';
import {postData} from './authServices';

export default async (url, params, token = authHeader) => {
  return await postData.post(url, params, {headers: token});
};
