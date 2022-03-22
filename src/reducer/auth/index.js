import {LOGIN_USER, REGISTER_USER} from '../../actions/AuthAction';

const initialState = {
  registerLoading: false,
  registerResults: false,
  registerError: false,

  loginLoading: false,
  loginResults: false,
  loginError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        registerLoading: action.payload.loading,
        registerResults: action.payload.data,
        registerError: action.payload.errorMessage,
      };

    case LOGIN_USER:
      return {
        ...state,
        loginLoading: action.payload.loading,
        loginResults: action.payload.data,
        loginError: action.payload.errorMessage,
      };

    default:
      return state;
  }
}
