import * as Types from '../types/pawtai.types';
const initialState = {
  loading: false,
  success: false,
  failure: false,
  pawtai_data: {},
  pawtai: {},
  all_Pawtai: [],
  profile_Data: {},
  mentioned_users: [],

};
export default (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case Types.Add_Pawtai_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        pawtai_data: payload,
      };

    case Types.Add_Pawtai_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        pawtai_data: payload,
      };
    case Types.Edit_Pawtai_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        pawtai_data: payload,
      };

    case Types.Edit_Pawtai_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        pawtai_data: payload,
      };
    case Types.Find_Pawtai_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        pawtai_data: payload,
      };

    case Types.Find_Pawtai_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        pawtai_data: payload,
      };
    case Types.Join_Pawtai_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        pawtai: payload,
      };

    case Types.Join_Pawtai_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        all_Pawtai: payload,
      };

    case Types.Fetch_Pawtai_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        all_Pawtai: payload,
      };

    case Types.Fetch_Pawtai_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        all_Pawtai: payload,
      };

    case Types.Pawtai_Profile_Data:
      return {
        ...state,
        loading: false,
       profile_Data: payload,
      };
          //List Mention User Pawtai
    case Types.Get_Mentioned_Pawtai_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        mentioned_users: payload, //new todos array
      };

    case Types.Get_Mentioned_Pawtai_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        mentioned_users: null,
      };

    case Types.Set_Pawtai_loader:
      return {
        ...state,
        loading: payload,
      };

    default:
      return state;
  }
};
