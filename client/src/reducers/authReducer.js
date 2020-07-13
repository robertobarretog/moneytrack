import isEmpty from '../validation/is-empty';

import {
  SET_CURRENT_USER,
  SET_AUTH_LOADING,
  STOP_AUTH_LOADING,
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case STOP_AUTH_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
