import {createStore} from 'redux';

const initialState = {
  USER_DETAIL: {},
  TOKEN: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_DETAIL': {
      return {USER_DETAIL: action.USER_DETAIL};
    }
    case 'TOKEN': {
      return {TOKEN: action.data};
    }
  }
  return state;
};

export const Store = createStore(reducer);
