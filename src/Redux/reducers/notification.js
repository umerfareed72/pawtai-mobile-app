import * as Types from '../types/notification.types';
const initialState = {
  loading: false,
  success: false,
  failure: false,
  device_token: {},
  notification: {},
  all_Notification: [],
  notificationInfo: {},
  unread_Notification: 0,
  read_Notification: 0,
  N_Info: {},
  Comments:[],
  post_index:0
};
export default (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    //Saving Device Token

    case Types.Save_Device_Token_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        device_token: payload,
      };

    case Types.Save_Device_Token_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        device_token: null,
      };

    //Get All Notification

    case Types.Get_All_Notification_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        all_Notification: payload.type
          ? payload.notifications_list
          : [...state.all_Notification, ...payload.notifications_list],
      };

    case Types.Get_All_Notification_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        all_Notification: null,
      };

    //Get Notification Setting

    case Types.Get_Notification_Setting_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        notification: payload,
      };

    case Types.Get_Notification_Setting_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        notification: null,
      };

    //Delete Notification

    case Types.Delete_Notification_Success:
      const {all_Notification} = state;
      const filteredItems = all_Notification.filter(notify => {
        return notify.id !== payload.id;
      });
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        all_Notification: [...filteredItems],
        unread_Notification:
          payload.unread != 1
            ? state.unread_Notification - 1
            : state.unread_Notification,
      };

    case Types.Delete_Notification_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        notification: null,
      };

    //Save Notification Info

    case Types.Save_Notification_Info_Success:
      const {unread_Notification} = state;
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        notificationInfo: payload,
        Comments:payload.Comments,
        post_index:payload?.post_index,
        unread_Notification: payload?.remote_Notification
          ? unread_Notification + 1
          : unread_Notification,
      };

    case Types.Save_Notification_Info_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        notificationInfo: null,
      };
    //Unread Notifications

    case Types.Unread_Notifications_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        unread_Notification: payload,
      };

    case Types.Unread_Notifications_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        unread_Notification: null,
      };

    //read Notifications

    case Types.read_Notifications_Success:
      state.all_Notification[payload].isRead = true;
      const filterUnread =
        state.all_Notification[payload].isRead == false
          ? state.unread_Notification
          : state.unread_Notification - 1;
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        all_Notification: state.all_Notification,
        unread_Notification: filterUnread,
      };

    case Types.read_Notifications_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        read_Notification: null,
      };

    //read All Notifications

    case Types.read_All_Success:
      for (let i = 0; i < state.all_Notification.length; i++) {
        state.all_Notification[i]['isRead'] = true;
      }
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        unread_Notification: payload,
        all_Notification: state.all_Notification,
      };

    case Types.read_All_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        unread_Notification: null,
      };

    //Notification Loader
    case Types.Set_Notification_loader:
      return {
        ...state,
        loading: payload,
      };

    default:
      return state;
  }
};
