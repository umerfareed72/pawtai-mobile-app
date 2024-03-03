import * as Types from '../types/post_pawtai.types';
import {header} from '../../Theme/Constants';
import {post, get} from '../../Services';
import {responseValidator} from './helper';
import {
  PAWTAI_CONST,
  POST_COMMENT_PAWTAI_CONST,
  POST_LIKE_PAWTAI_CONST,
  POST_PAWTAI_CONST,
} from '../../Theme/routes';
import {EmojiHelper} from '../../Theme/Helper/EmojiHelper';

/////////////////////////////////////////  Post List  /////////////////////////////////////

export const get_all_Posts = (data, callBack) => async dispatch => {
  try {
    dispatch({type: Types.Set_Publish_Post_loader, payload: true});
    let response = await get(
      `${POST_PAWTAI_CONST}list?page=${data.page}`,
      await header(),
    );
    // EmojiHelper
    for (let i = 0; i < response.data.result.data.length; i++) {
      let firstObj = response.data.result.data[i];
      firstObj.text = EmojiHelper(firstObj.text);
      response.data.result.data[i]['isLike'] =
        response.data.result.data[i].is_liked_by_me == 0 ? false : true;
      response.data.result.data[i]['isComment'] =
        response.data.result.data[i].is_comment_by_me == 0 ? false : true;
    }
    const All_Posts = {
      all_Posts: response.data.result.data,
      type: data?.reload,
    };
    dispatch({
      type: Types.All_Publish_Post_Success,
      payload: All_Posts,
    });
    callBack(response.data.result.data);
  } catch (error) {
    dispatch({
      type: Types.All_Publish_Post_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error?.response?.data?.message;
    responseValidator(status, msg);
  }
};
//////////////////////////////////////Add Comments///////////////////////
export const add_comments = (data, callBack) => async dispatch => {
  try {
    dispatch({type: Types.Set_Publish_Post_loader, payload: true});
    var form = new FormData();
    form.append('post_id', data?.post_id);
    form.append('text', data?.text);

    const response = await post(
      `${POST_COMMENT_PAWTAI_CONST}add`,
      form,
      await header(),
    );
    const CommentData = {
      comment: response?.data?.result,
      index: data?.index,
    };
    dispatch({
      type: Types.Add_Comments_Success,
      payload: CommentData,
    });
    callBack();
  } catch (error) {
    console.log(error);
    dispatch({
      type: Types.Add_Comments_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};

///////////////////////////////////Add Likes///////////////////////////////

export const add_Likes = (data, callBack) => async dispatch => {
  try {
    dispatch({type: Types.Set_Publish_Post_loader, payload: true});
    const response = await get(
      `${POST_LIKE_PAWTAI_CONST}add/${data?.post_id}`,
      await header(),
    );
    // console.log(response.data.result);
    dispatch({
      type: Types.Add_Likes_Success,
      payload: data?.index,
    });
    callBack();

    // console.log({response: response.data});
  } catch (error) {
    console.log(error);
    dispatch({
      type: Types.Add_Likes_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};

////Remove Likes

export const remove_Likes = (data, callBack) => async dispatch => {
  try {
    dispatch({type: Types.Set_Publish_Post_loader, payload: true});
    const response = await get(
      `${POST_LIKE_PAWTAI_CONST}remove/${data?.post_id}`,
      await header(),
    );
    dispatch({
      type: Types.Remove_Likes_Success,
      payload: data?.index,
    });

    callBack();
  } catch (error) {
    console.log(error);
    dispatch({
      type: Types.Remove_Likes_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};
///////////////////////Get Comments///////////////////////////
export const get_all_Comments = data => async dispatch => {
  try {
    dispatch({type: Types.Set_Publish_Post_loader, payload: true});
    const response = await get(
      `${POST_PAWTAI_CONST}detail/${data.post_id}`,
      await header(),
    );
 
    for (let i = 0; i < response.data.result.comments.length; i++) {
      let firstObj = response.data.result.comments[i];
      firstObj.text = EmojiHelper(firstObj.text);
    }
    dispatch({
      type: Types.Get_Comment_Success,
      payload: response.data.result,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: Types.Get_Comment_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};

///////////////////////Post Added///////////////////////////
export const update_post_list_data = data => async dispatch => {
  let listMentionUser = await post(
    `${PAWTAI_CONST}users`,
    {pawtai_id: data?.pawtai?.id},
    await header(),
  );
  const myData = {
    listUsers: listMentionUser.data?.result,
    postData: data,
  };

  dispatch({type: Types.Update_Post_List_Success, payload: myData});
};
