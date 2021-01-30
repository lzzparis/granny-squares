import { AUTHENTICATE } from '../actions/user';
// const AUTHENTICATE = 'authenticate';

const initialState = { data: {}, auth: {} };
const user = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        auth: action.payload.auth,
        data: action.payload.data,
      };
    default:
      return initialState;
  }
};

export default user;
