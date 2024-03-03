import {EmojiHelper} from '../../Theme/Helper/EmojiHelper';
import {UserNameHelper} from '../../Theme/Helper/UsernameHelper';
import * as Types from '../types/post_pawtai.types';
const initialState = {
  loading: false,
  success: false,
  failure: false,
  post_pawtai: {},
  post_pawtai_list: [],
  likes: 0,
  comments: [],
  all_comments: [],
};
export default (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case Types.Publish_Post_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        post_pawtai: payload,
      };

    case Types.Publish_Post_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        post_pawtai: payload,
      };
    case Types.All_Publish_Post_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        post_pawtai_list: payload.type
          ? payload.all_Posts
          : [...state.post_pawtai_list, ...payload.all_Posts],
      };

    case Types.All_Publish_Post_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        post_pawtai_list: payload,
      };
    case Types.Add_Likes_Success:
      state.post_pawtai_list[payload].isLike = !state.post_pawtai_list[payload]
        .isLike;
      state.post_pawtai_list[payload].likes_count =
        state.post_pawtai_list[payload].likes_count + 1;

      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        post_pawtai_list: state.post_pawtai_list,
      };

    case Types.Add_Likes_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        likes: payload,
      };
    case Types.Remove_Likes_Success:
      state.post_pawtai_list[payload].isLike = !state.post_pawtai_list[payload]
        .isLike;
      state.post_pawtai_list[payload].likes_count =
        state.post_pawtai_list[payload].likes_count - 1;

      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        post_pawtai_list: state.post_pawtai_list,
      };

    case Types.Remove_Likes_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        likes: payload,
      };
    case Types.Add_Comments_Success:
      const {post_pawtai_list} = state;
      if (payload?.index != undefined) {
        post_pawtai_list[payload?.index].isComment = true;
        post_pawtai_list[payload?.index].comments_count =
          post_pawtai_list[payload?.index].comments_count + 1;
      }
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        comments: payload.comment,
        post_pawtai_list: post_pawtai_list,
      };

    case Types.Add_Comments_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        comments: payload,
      };
    case Types.Get_Comment_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        all_comments: payload, //new todos array
      };

    case Types.Get_Comment_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        all_comments: payload,
      };


    //Update Post List Data
    case Types.Update_Post_List_Success:
      const newFilterd = state.post_pawtai_list;
      let firstObj = payload.postData;
      firstObj.text = EmojiHelper(firstObj.text);
      firstObj.text = UserNameHelper(payload.listUsers, firstObj.text);
      newFilterd.unshift(firstObj);
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        post_pawtai_list: newFilterd,
      };

    case Types.Set_Publish_Post_loader:
      return {
        ...state,
        loading: payload,
      };

    default:
      return state;
  }
};
