import _ from 'lodash';
import assign from 'object-assign';
import { EventEmitter } from 'events';
import Dispatcher, { CHANGE_EVENT } from '../dispatcher/appDispatcher.js';
import {
  LANGUAGE_CHANGE_LANGUAGE
} from '../constants/actionTypes.js';

import en from '../translations/en.js';
import es from '../translations/es.js';
// <--- add new language bundles HERE

export var languages = [
  {
    name: 'English',
    code: 'en',
    id: 1
  },
  {
    name: 'Español',
    code: 'es',
    id: 2
  },
  // <--- add new language bundles HERE
];

export var defaultLanguage = languages[0];

const languagePack = {
  en,
  es,
  // <--- add new language bundles HERE
};

let Polyglot = require('node-polyglot');
let polyglot = new Polyglot({ locale: defaultLanguage.code });

polyglot.extend(languagePack);

let state = defaultLanguage;

export function T__(key, data) {
  return polyglot.t(polyglot.locale() + '.' + key, data);
};

let TranslationsStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getState: function() {
    return state;
  }
});

TranslationsStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.actionType) {
    case LANGUAGE_CHANGE_LANGUAGE:

      state = _.find(languages, { code: action.value }) || defaultLanguage;

      polyglot.locale(state.code);

      TranslationsStore.emitChange();
      break;
    default:
      // nothing to do
      break;
  }
});

export default TranslationsStore;
