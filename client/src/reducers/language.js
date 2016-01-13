import _ from 'lodash';
import * as types from '../constants/actionTypes.js';
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

export default function language(state = initialState, action) {
  switch(action.type) {
    case types.LANGUAGE_CHANGE_LANGUAGE:

      language = _.find(languages, { code: action.value }) || defaultLanguage;

      polyglot.locale(language.code);

      return _.clone(language);
    default:
      // nothing to do
      return state;
    }
};
