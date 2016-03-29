/* global Polyglot */

import _ from 'lodash';
import { UPDATE_LOCATION } from 'react-router-redux';
import en from '../translations/en.js';
import es from '../translations/es.js';
// <--- add new language bundles HERE

export const languages = [
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

export const defaultLanguage = languages[0];

const languagePack = {
  en,
  es,
  // <--- add new language bundles HERE
};

const Polyglot = require('node-polyglot');
const polyglot = new Polyglot({ locale: defaultLanguage.code });

polyglot.extend(languagePack);

const initialState = defaultLanguage;

export function T__(key, data) {
  return polyglot.t(`${polyglot.locale()}.${key}`, data);
}

function getLanguageByCode(code) {
  return _.find(languages, { code });
}

export function validLanguageCode(code) {
  return !!getLanguageByCode(code);
}

export default function language(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOCATION:
      const { pathname } = action.payload;
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
}
