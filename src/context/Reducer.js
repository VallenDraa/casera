import { USERACTIONS } from './Actions';

export const userReducer = (state, action) => {
  switch (action.type) {
    case USERACTIONS.LoginSuccess:
      state = action.payload;
      console.log(state);
      sessionStorage.setItem('user', JSON.stringify(action.payload));
      return action.payload;
    case USERACTIONS.LoginFailure:
      return { error: true };
    case USERACTIONS.Logout:
      sessionStorage.removeItem('user');
      return null;
    default:
      return;
  }
};
