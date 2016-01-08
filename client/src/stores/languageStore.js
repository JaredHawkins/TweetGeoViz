'use strict';

import en from '../translations/en.js';
import sp from '../translations/sp.js';
// <--- add new language bundles HERE

export var languages = [
  {
    name: 'English',
    code: 'en',
    id: 1
  },
  {
    name: 'Español',
    code: 'sp',
    id: 2
  },
  // <--- add new language bundles HERE
];

const languagePack = {
  en,
  sp,
  // <--- add new language bundles HERE
};

export var defaultLanguage = languages[0];

var Dispatcher = require('../dispatcher/appDispatcher.js'),
    ActionTypes = require('../constants/actionTypes.js'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    _ = require('lodash'),
    CHANGE_EVENT = 'change';

var Polyglot = require('node-polyglot');
var polyglot = new Polyglot({ locale: defaultLanguage.code });

polyglot.extend(languagePack);

var state = {
  language: defaultLanguage
};

export function T__(key, data) {
  return polyglot.t(polyglot.locale() + '.' + key, data);
};

var TranslationsStore = assign({}, EventEmitter.prototype, {
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
    case ActionTypes.LANGUAGE_CHANGE_LANGUAGE:

      let language = _.find(languages, { id: action.value }) || defaultLanguage;

      state = {
        ...state,
        language
      }

      polyglot.locale(language.code);

      TranslationsStore.emitChange();
      break;
    default:
      // nothing to do
      break;
  }
});

export default TranslationsStore;
