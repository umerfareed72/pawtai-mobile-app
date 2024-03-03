import * as Types from '../types/notification.types';
import {header} from '../../Theme/Constants';
import {post, get} from '../../Services';
import {responseValidator} from './helper';
import {
  PAWTAI_DEVICE_TOKEN_CONST,
  PAWTAI_NOTIFICATION_CONST,
  PAWTAI_NOTIFICATION_SETTING_CONST,
  POST_PAWTAI_CONST,
} from '../../Theme/routes';
import { EmojiHelper } from '../../Theme/Helper/EmojiHelper';

//Save Device Token

export const save_device_token = token => async dispatch => {
  try {
    dispatch({type: Types.Set_Notification_loader, payload: true});
    var form = new FormData();
    form.append('value', token);
    const response = await post(
      `${PAWTAI_DEVICE_TOKEN_CONST}add`,
      form,
      await header(),
    );
    dispatch({
      type: Types.Save_Device_Token_Success,
      payload: response?.data?.result,
    });
    console.log('Device Token Saved Successfully');
  } catch (error) {
    console.log(error);
    console.log(JSON.stringify(error));
    dispatch({
      type: Types.Save_Device_Token_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};
//Get All Notification List
export const all_notification_list = (data, callBack) => async dispatch => {
  try {
    dispatch({type: Types.Set_Notification_loader, payload: true});
    const response = await get(
      `${PAWTAI_NOTIFICATION_CONST}list?page=${data.page}`,
      await header(),
    );
    for (let i = 0; i < response.data.result.data.length; i++) {
      response.data.result.data[i]['isRead'] =
        response.data.result.data[i].is_read == 0 ? false : true;
    }
    const Notications = {
      notifications_list: response?.data?.result.data,
      type: data.reload,
    };
    dispatch({
      type: Types.Get_All_Notification_Success,
      payload: Notications,
    });
    callBack(response?.data?.result.data);
    console.log('Get All Notification Success');
  } catch (error) {
    console.log(error);
    dispatch({
      type: Types.Get_All_Notification_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};

//Get All Notification Setting
export const all_notification_setting_list = () => async dispatch => {
  try {
    dispatch({type: Types.Set_Notification_loader, payload: true});
    const response = await get(
      `${PAWTAI_NOTIFICATION_SETTING_CONST}list`,
      await header(),
    );
    dispatch({
      type: Types.Get_Notification_Setting_Success,
      payload: response?.data?.result,
    });
    console.log('Get All Notification Setting Success');
  } catch (error) {
    console.log(error);
    dispatch({
      type: Types.Get_Notification_Setting_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};
//Save Notification Setting
export const save_notification_setiing = (data, callBack) => async dispatch => {
  try {
    var form = new FormData();
    form.append('like', data?.like);
    form.append('reply', data?.reply);
    form.append('mention', data?.mention);
    form.append('event', data?.event);
    form.append('new_user', data?.new_user);

    dispatch({type: Types.Set_Notification_loader, payload: true});
    const response = await post(
      `${PAWTAI_NOTIFICATION_SETTING_CONST}update`,
      form,
      await header(),
    );
    dispatch({
      type: Types.Save_Notification_Setting_Success,
      payload: response?.data?.result,
    });
    callBack();
    console.log('Get All Notification Setting Success');
  } catch (error) {
    console.log(error);
    dispatch({
      type: Types.Save_Notification_Setting_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};
//Delete Notification
export const delete_Notification = (data, callBack) => async dispatch => {
  try {
    dispatch({type: Types.Set_Notification_loader, payload: true});
    const response = await get(
      `${PAWTAI_NOTIFICATION_CONST}delete/${data?.id}`,
      await header(),
    );

    dispatch({
      type: Types.Delete_Notification_Success,
      payload: data,
    });
    callBack();
    console.log('Notification Deleted Success');
  } catch (error) {
    console.log(error);
    dispatch({
      type: Types.Delete_Notification_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};
//Save Notification Handler
export const save_Notification_Info = (data, callBack) => async dispatch => {
  try {
    dispatch({type: Types.Set_Notification_loader, payload: true});
    const response = await get(
      `${POST_PAWTAI_CONST}detail/${data?.post_id}`,
      await header(),
    );

    for (let i = 0; i < response.data.result.comments.length; i++) {
      let firstObj = response.data.result.comments[i];
      firstObj.text = EmojiHelper(firstObj.text);
    }
    const NotificationInfo = {
      info: response?.data?.result,
      Comments:response?.data?.result.comments,
      remote_Notification: data?.remote_Notification,
      post_index:data?.index
    };
    dispatch({
      type: Types.Save_Notification_Info_Success,
      payload: NotificationInfo,
    });
    callBack();
  } catch (error) {
    console.log(error);
    dispatch({
      type: Types.Save_Notification_Info_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};

//Unread Notification Handler
export const Unread_Notifications = callBack => async dispatch => {
  try {
    dispatch({type: Types.Set_Notification_loader, payload: true});
    const response = await get(
      `${PAWTAI_NOTIFICATION_CONST}unread-count`,
      await header(),
    );
    dispatch({
      type: Types.Unread_Notifications_Success,
      payload: response.data.result,
    });
    callBack();
  } catch (error) {
    console.log(error);
    dispatch({
      type: Types.Unread_Notifications_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};

//Save Notification Handler
export const read_Notifications = (data, callBack) => async dispatch => {
  try {
    dispatch({type: Types.Set_Notification_loader, payload: true});
    const response = await get(
      `${PAWTAI_NOTIFICATION_CONST}read/${data?.id}`,
      await header(),
    );
    if(data?.index!=null){

    
    dispatch({
      type: Types.read_Notifications_Success,
      payload: data?.index,
    });
  }

    // console.log(response?.data?.result);
    callBack();
  } catch (error) {
    console.log(error);
    dispatch({
      type: Types.read_Notifications_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};
//Read All Notification Handler
export const read_all_Notifications = callBack => async dispatch => {
  try {
    dispatch({type: Types.Set_Notification_loader, payload: true});
    const response = await get(
      `${PAWTAI_NOTIFICATION_CONST}read_all`,
      await header(),
    );
    dispatch({
      type: Types.read_All_Success,
      payload: 0,
    });

    // console.log(response?.data?.result);
    callBack();
  } catch (error) {
    console.log(error);
    dispatch({
      type: Types.read_All_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};
