import * as Types from "../types/event_pawtai.types";
import { header, week_days } from "../../Theme/Constants";
import { post, get } from "../../Services";
import { responseValidator } from "./helper";
import { PAWTAI_CONST, PAWTAI_EVENTS_CONST } from "../../Theme/routes";
import { EmojiHelper } from "../../Theme/Helper/EmojiHelper";
import colors from "../../Theme/Colors";
import moment from "moment";
import { date } from "yup";

/////////////////////////////////////////  Add Pawtai Event  ////////////////////////////

export const add_pawtai_event = (data, callBack) => async (dispatch) => {
  try {
    dispatch({ type: Types.Set_Pawtai_Event_Loader, payload: true });
    const response = await post(
      `${PAWTAI_EVENTS_CONST}store`,
      data,
      await header()
    );
    dispatch({
      type: Types.Add_Pawtai_Event_Success,
      payload: response?.data.result,
    });
    callBack();
  } catch (error) {
    console.log(error);
    console.log(JSON.stringify(error));
    dispatch({
      type: Types.Add_Pawtai_Event_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};

//////////////////////////////////////  Edit Pawtai Event  ////////////////////////////

export const edit_pawtai_event = (data, callBack) => async (dispatch) => {
  try {
    dispatch({ type: Types.Set_Pawtai_Event_Loader, payload: true });
    const response = await post(
      `${PAWTAI_EVENTS_CONST}update`,
      data,
      await header()
    );
    dispatch({
      type: Types.Edit_Pawtai_Event_Success,
      payload: response.data.result,
    });

    callBack();
  } catch (error) {
    console.log(error);
    dispatch({
      type: Types.Edit_Pawtai_Event_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};

///////////////////////////////////////// Get Pawtai Event List ////////////////////////////

export const get_pawtai_event_list = (data, callBack) => async (dispatch) => {
  try {
    const response = await get(
      `${PAWTAI_EVENTS_CONST}upcoming-events?page=${data?.page}&start_date=${data?.start_date}&start_time=${data?.start_time}`,
      await header()
    );
    for (let i = 0; i < response.data.result.data.length; i++) {
      let firstObj = response.data.result.data[i];
      firstObj.title = EmojiHelper(firstObj.title);
    }
    const UpcomingEvents = {
      upcoming_Events: response?.data?.result?.data,
      week_days: data?.week_days,
      type: data?.reload,
    };
    dispatch({
      type: Types.Get_Pawtai_Event_Success,
      payload: UpcomingEvents,
    });

    callBack(response?.data?.result?.data);
  } catch (error) {
    console.log(error);
    console.log(JSON.stringify(error));
    dispatch({
      type: Types.Get_Pawtai_Event_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};

/////////////////////////////////////////  Get Pawtai Calender Events ////////////////////////////

export const get_pawtai_calender_events = (data) => async (dispatch) => {
  try {
    const response = await post(
      `${PAWTAI_EVENTS_CONST}calender`,
      data,
      await header()
    );
    if (response?.data.result != "") {
      let newDaysObject = {};
      const todaydate = new Date();
      const eventDate = moment(todaydate).format("YYYY-MM-DD");
      response.data.result?.forEach((day) => {
        newDaysObject[day] = {
          ...newDaysObject,
          selected: true,
          marked: true,
        };
        if (day == eventDate) {
          newDaysObject[day] = {
            ...newDaysObject,
            selected: true,
            selectedColor: colors.themeColor,
            dotColor: colors.white,
            marked: true,
            customStyles: {
              container: {
                borderRadius: 0,
                backgroundColor: colors.themeColor,
                elevation: 2,
              },
              text: {
                color: colors.white,
                fontWeight: "bold",
              },
            },
          };
        }
      });
      const calendderData = {
        markedDates: newDaysObject,
        calenderDates: response.data.result,
      };
      dispatch({
        type: Types.Get_Pawtai_Calender_Event_Success,
        payload: calendderData,
      });
    }
    // console.log('Loading.....', response.data.result);
  } catch (error) {
    console.log(error);
    console.log(JSON.stringify(error));
    dispatch({
      type: Types.Get_Pawtai_Calender_Event_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};
///////////////////////////////////////// My Events ////////////////////////////

export const my_pawtai_events = (data, callBack) => async (dispatch) => {
  try {
    const response = await get(
      `${PAWTAI_EVENTS_CONST}my-events?page=${data?.page}&start_date=${data?.start_date}&start_time=${data?.start_time}`,

      await header()
    );
    for (let i = 0; i < response.data.result.data.length; i++) {
      let firstObj = response.data.result.data[i];
      firstObj.title = EmojiHelper(firstObj.title);
    }

    const MyEvents = {
      my_Events: response?.data?.result?.data,
      type: data?.reload,
    };
    dispatch({
      type: Types.MY_Pawtai_Event_Success,
      payload: MyEvents,
    });
    callBack(response?.data?.result?.data);
  } catch (error) {
    console.log(error);
    console.log(JSON.stringify(error));
    dispatch({
      type: Types.MY_Pawtai_Event_Success,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};

///////////////////////////////////////// Cancel Events ////////////////////////////

export const cancel_pawtai_events = (id, callBack) => async (dispatch) => {
  try {
    dispatch({ type: Types.Set_Pawtai_Event_Loader, payload: true });
    const response = await get(
      `${PAWTAI_EVENTS_CONST}cancel/${id}`,
      await header()
    );
    dispatch({
      type: Types.Cancel_Pawtai_Event_Success,
      payload: id,
    });
    console.log("Calender Events", response.data.result);
    callBack();
  } catch (error) {
    console.log(error);
    console.log(JSON.stringify(error));
    dispatch({
      type: Types.Cancel_Pawtai_Event_Success,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};

///////////////////////////////////////// List Events ////////////////////////////

export const list_pawtai_events = () => async (dispatch) => {
  try {
    dispatch({ type: Types.Set_Pawtai_Event_Loader, payload: true });
    const response = await get(`${PAWTAI_EVENTS_CONST}list`, await header());

    dispatch({
      type: Types.List_Pawtai_Calender_Event_Success,
      payload: response?.data?.result,
    });
    // console.log('Calender Events',response.data.result);
  } catch (error) {
    console.log(error);
    console.log(JSON.stringify(error));
    dispatch({
      type: Types.List_Pawtai_Calender_Event_Success,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};

///////////////////////////////////////// My Events ////////////////////////////

export const save_event_detail = (data, callBack) => async (dispatch) => {
  try {
    dispatch({ type: Types.Set_Pawtai_Event_Loader, payload: true });

    const response = await get(
      `${PAWTAI_EVENTS_CONST}detail/${data?.id}`,
      await header()
    );
    let firstObj = response?.data.result;
    let weekdays = JSON.parse(firstObj.repeat);
    if (firstObj.repeat_type == "Weekly") {
      const responseData = {
        eventData: response?.data.result,
        weekdays: weekdays,
      };
      dispatch({
        type: Types.Save_Event_Detail_Success,
        payload: responseData,
      });
      callBack();
    } else {
      const responseData = {
        eventData: response?.data.result,
        weekdays: week_days,
      };
      dispatch({
        type: Types.Save_Event_Detail_Success,
        payload: responseData,
      });
      callBack();
    }
  } catch (error) {
    console.log(error);
    console.log(JSON.stringify(error));
    dispatch({
      type: Types.Save_Event_Detail_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};
///////////////////////////////////////// My Events ////////////////////////////

export const pick_week_day = (index) => async (dispatch) => {
  try {
    dispatch({ type: Types.Pick_Week_Day_Success, payload: index });
  } catch (error) {}
};
export const pick_Month = (date) => async (dispatch) => {
  try {
    dispatch({ type: Types.Pick_Date_Success, payload: date });
  } catch (error) {}
};

export const list_week_days = (data, callBack) => async (dispatch) => {
  try {
    dispatch({ type: Types.List_Week_Days_Success, payload: data });
    callBack();
  } catch (error) {}
};
