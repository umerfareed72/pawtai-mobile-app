import {combineReducers} from 'redux';
import auth from './auth';
import pawtai from './pawtai';
import post_pawtai from './post_pawtai';
import notification from './notification';
import event from './event_pawtai';
import * as Types from '../types/auth.types';



const appReducer = combineReducers({
  /* your app’s top-level reducers */
  auth:auth,
  pawtai:pawtai,
  post_pawtai:post_pawtai,
  notification:notification,
  event:event
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === Types.Logout_Success) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;