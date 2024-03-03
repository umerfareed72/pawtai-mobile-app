import * as Types from '../types/event_pawtai.types';
const initialState = {
  loading: false,
  success: false,
  failure: false,
  event_pawtai: {},
  upcoming_events: [],
  my_events: [],
  calender_events: {},
  edit_event: [],
  weekDays: [],
  list_events: [],
  event_detail: {},
  event_lists: [],
  current_month: new Date(),
};
export default (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case Types.Add_Pawtai_Event_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        event_pawtai: payload,
      };

    case Types.Add_Pawtai_Event_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        event_pawtai: null,
      };
    case Types.Get_Pawtai_Event_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        upcoming_events: payload.type
          ? payload.upcoming_Events
          : [...state.upcoming_events, ...payload.upcoming_Events],
      };

    case Types.Get_Pawtai_Event_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        upcoming_events: null,
      };
    //Calender Events
    case Types.Get_Pawtai_Calender_Event_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        calender_events: payload.markedDates,
        event_lists: payload.calenderDates,
      };

    case Types.Get_Pawtai_Calender_Event_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        calender_events: null,
        event_lists: null,
      };
    //My Events
    case Types.MY_Pawtai_Event_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        my_events: payload.type
          ? payload.my_Events
          : [...state.my_events, ...payload.my_Events],
      };

    case Types.MY_Pawtai_Event_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        my_events: null,
      };
    //List Events
    case Types.List_Pawtai_Calender_Event_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        list_events: payload,
      };

    case Types.List_Pawtai_Calender_Event_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        list_events: null,
      };
    //Edit Event
    case Types.Edit_Pawtai_Event_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        edit_events: payload,
      };

    case Types.Edit_Pawtai_Event_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        edit_events: null,
      };

    //Cancel Event
    case Types.Cancel_Pawtai_Event_Success:
      const {upcoming_events, my_events} = state;
      const filteredItems = upcoming_events.filter(notify => {
        return notify.id !== payload;
      });
      const newItems = my_events.filter(notify => {
        return notify.id !== payload;
      });

      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        upcoming_events: [...filteredItems],
        my_events: [...newItems],
      };

    case Types.Cancel_Pawtai_Event_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        cancel_detail: null,
      };

    case Types.Save_Event_Detail_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        event_detail: payload?.eventData,
        weekDays:payload.weekdays
      };
    case Types.Save_Event_Detail_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        event_detail: null,
      };
    case Types.Set_Pawtai_Event_Loader:
      return {
        ...state,
        loading: payload,
      };
    case Types.Pick_Week_Day_Success:
      state.weekDays[payload].status =
        state.weekDays[payload].status == 0 ? 1 : 0;
      return {
        ...state,
        weekDays: [...state.weekDays],
      };
    case Types.Pick_Date_Success:
      return {
        ...state,
        current_month: payload,
      };
    case Types.List_Week_Days_Success:
      return {
        ...state,
        weekDays: payload,
      };
    default:
      return state;
  }
};
