import * as Types from '../types/pawtai.types';
import {header} from '../../Theme/Constants';
import {PAWTAI_CONST} from '../../Theme/routes';
import {post, get, axios} from '../../Services';
import {responseValidator} from './helper';

/////////////////////////////////////////  Add Pawtai   ////////////////////////////

export const add_Pawtai = (data, callBack) => async dispatch => {
  try {
    dispatch({type: Types.Set_Pawtai_loader, payload: true});
    var form = new FormData();
    form.append('name', data.name);
    form.append('image', data.image);
    const response = await post(`${PAWTAI_CONST}add`, form, await header());
    // console.log(response?.data.result);
    dispatch({
      type: Types.Add_Pawtai_Success,
      payload: response.data,
    });
    callBack();
  } catch (error) {
    console.log(error);
    dispatch({
      type: Types.Add_Pawtai_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};

/////////////////////////////////////////  Edit Pawtai Profile Image  ////////////////////////////

export const edit_Pawtai_profile = (data, callBack) => async dispatch => {
  try {
    dispatch({type: Types.Set_Pawtai_loader, payload: true});
    var form = new FormData();
    data?.image?.uri != undefined && form.append('image', data.image);
    const response = await post(
      `${PAWTAI_CONST}edit-image/${data?.p_id}`,
      form,
      await header(),
    );
    dispatch({
      type: Types.Edit_Pawtai_Success,
      payload: response.data,
    });
    callBack();
    // console.log({response: response.data});
  } catch (error) {
    console.log(error);
    dispatch({
      type: Types.Edit_Pawtai_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};

/////////////////////////////////////////  Find Pawtai   ////////////////////////////

export const find_Pawtai = (data, callBack) => async dispatch => {
  try {
    dispatch({type: Types.Set_Pawtai_loader, payload: true});
    const response = await get(
      `${PAWTAI_CONST}find/${data.pid}`,
      await header(),
    );
    dispatch({
      type: Types.Find_Pawtai_Success,
      payload: response.data.result.pawtaiDetails,
    });
    callBack();
    // console.log(response.data);
  } catch (error) {
    console.error(error);
    dispatch({
      type: Types.Find_Pawtai_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};

/////////////////////////////////////////  Join Pawtai   ////////////////////////////

export const join_Pawtai = (data, callBack) => async dispatch => {
  try {
    dispatch({type: Types.Set_Pawtai_loader, payload: true});
    const response = await post(`${PAWTAI_CONST}join`, data, await header());
    dispatch({
      type: Types.Join_Pawtai_Success,
      payload: response.data,
    });
    callBack();
  } catch (error) {
    console.error(error);
    dispatch({
      type: Types.Join_Pawtai_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};

/////////////////////////////////////////  All Pawtai   ////////////////////////////

export const all_Pawtai = () => async dispatch => {
  try {
    dispatch({type: Types.Set_Pawtai_loader, payload: true});
    const response = await get(`${PAWTAI_CONST}list`, await header());
    dispatch({
      type: Types.Fetch_Pawtai_Success,
      payload: response.data.result,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: Types.Fetch_Pawtai_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};
/////////////////////////////////////////  Profile Pawtai   ////////////////////////////

export const pawtaiProfile = (data, callBack) => async dispatch => {
  try {
    dispatch({
      type: Types.Pawtai_Profile_Data,
      payload: data,
    });
    callBack();
  } catch (error) {
    alert('Something went wrong');
  }
};

///////////////////////Mentioned User List///////////////////////////
export const list_mentioned_pawtai = data => async dispatch => {
  try {
    let listMentionUser = await post(
      `${PAWTAI_CONST}users`,
      {pawtai_id: data?.id},
      await header(),
    );

    dispatch({
      type: Types.Get_Mentioned_Pawtai_Success,
      payload: listMentionUser.data.result,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: Types.Get_Mentioned_Pawtai_Failure,
      payload: null,
    });
  }
};
