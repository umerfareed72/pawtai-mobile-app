import {authHeader, header} from '../Theme/Constants';
import {getData} from './authServices';
export default async (url, token = authHeader, params) => {
  return getData.get(url, {headers: token}, {params: {...params}});
};
