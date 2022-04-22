import { USERACTIONS } from './Actions';

export const userReducer = (state, { type, payload }) => {
  switch (type) {
    case USERACTIONS.LoginSuccess:
      sessionStorage.setItem('user', JSON.stringify(payload));
      return payload;
    case USERACTIONS.LoginFailure:
      return { error: true };
    case USERACTIONS.Logout:
      sessionStorage.removeItem('user');
      return null;
    case USERACTIONS.getUserData:
      if (sessionStorage.getItem('user')) {
        return JSON.parse(sessionStorage.getItem('user'));
      }
    default:
      return;
  }
};
