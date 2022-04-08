import { MENUACTIONS } from './Actions';

export function menuReducer(state, action) {
  switch (action.type) {
    case MENUACTIONS.open:
      return true;
    case MENUACTIONS.close:
      return false;
    case MENUACTIONS.checkViewport:
      if (window.innerWidth >= 768) {
        if (state) return;
        return true;
      } else {
        if (!state) return;
        return false;
      }
    default:
      return false;
  }
}
