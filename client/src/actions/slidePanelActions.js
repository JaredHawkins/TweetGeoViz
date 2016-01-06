import Dispatcher from '../dispatcher/appDispatcher.js';
const dispatch = Dispatcher.dispatch.bind(Dispatcher);
import {
  SLIDEPANEL_HIDE
} from '../constants/actionTypes.js';

export function hide() {
  dispatch({
    type: SLIDEPANEL_HIDE
  });
};

export default {
  hide
};
