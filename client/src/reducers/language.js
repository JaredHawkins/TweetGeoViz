/* global Polyglot */

import Polyglot from 'node-polyglot';
import { UPDATE_LOCATION } from 'react-router-redux';
import translations from '../constants/translations.js';

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
  {
    name: 'Русский',
    code: 'ru',
    id: 3
  }
  // <--- add new language bundles HERE
];

export const defaultLanguage = languages[0];

const polyglot = new Polyglot({ locale: defaultLanguage.code });
polyglot.extend(translations);

function getLanguageByCode(code) {
  return languages.find(language => language.code === code);
}

export function T__(key, data) {
  return polyglot.t(`${key}.${polyglot.locale()}`, data);
}

export function validLanguageCode(code) {
  return !!getLanguageByCode(code);
}

const initialState = defaultLanguage;

export default function language(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOCATION:
      const { pathname } = action.payload;
      const [, code] = pathname.split('/');

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
