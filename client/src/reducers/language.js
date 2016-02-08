import _ from 'lodash';
import * as types from '../constants/actionTypes.js';
import { UPDATE_LOCATION } from 'redux-simple-router';
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

let initialState = defaultLanguage;

export function T__(key, data) {
  return polyglot.t(polyglot.locale() + '.' + key, data);
};

function getLanguageByCode(code) {
  return _.find(languages, { code });
};

export function validLanguageCode(code) {
  return !!getLanguageByCode(code);
};

export default function language(state = initialState, action) {
  switch(action.type) {
    case UPDATE_LOCATION:
      const { pathname } = action.location;
      const code = pathname.substr(1);

      // if it is unknown language code
      if (!validLanguageCode(code)) {
        polyglot.locale(defaultLanguage.code);
        return defaultLanguage;
      }

      polyglot.locale(code);
      return getLanguageByCode(code);
    default:
      // nothing to do
      return state;
    }
};
