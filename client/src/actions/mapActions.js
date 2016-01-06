import Dispatcher from '../dispatcher/appDispatcher.js';
const dispatch = Dispatcher.dispatch.bind(Dispatcher);
import {
  MAP_CHANGE_VALUE,
  MAP_CLICK
} from '../constants/actionTypes.js';

export function changeValue(name, value) {
  dispatch({
    type: MAP_CHANGE_VALUE,
    name,
    value
  });
};

export function click(options = {}) {
  dispatch({
    type: MAP_CLICK,
    point: options.point,
    lpoint: options.lpoint,
    bounds: options.bounds
  });
};

export default {
  changeValue,
  click
};
