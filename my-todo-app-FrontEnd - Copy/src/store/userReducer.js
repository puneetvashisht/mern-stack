import * as actions from "../actions/action";

const initialState = {
  user: { userId: null, loggedIn: false },
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGGED_IN: {
      return { user: action.payload };
    }
    case actions.LOGOUT: {
      return { user: { userId: null, loggedIn: false } };
    }

    default:
      return state;
  }
};

export default userReducer;
