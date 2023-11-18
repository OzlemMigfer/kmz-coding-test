const initialState = {
  username: '',
  isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        username: action.payload.username,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        username: '',
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default userReducer;
