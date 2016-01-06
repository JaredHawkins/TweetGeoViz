import Dispatcher from '../dispatcher/appDispatcher.js';
const dispatch = Dispatcher.dispatch.bind(Dispatcher);
import {
  INITIALIZE
} from '../constants/actionTypes.js';

export function initApp() {
  dispatch({
    type: INITIALIZE,
    initialData: {}
  });
};

export default {
  initApp
};
