import expect from 'expect';
import dataPopup from '../../client/src/reducers/dataPopup.js';
import * as types from '../../client/src/constants/actionTypes.js';

const initialState = {
  point: {
    x: undefined,
    y: undefined
  },
  visible: false
};

describe('DataPopup reducer:', () => {
  it('should return the initial state', () => {
    expect(
      dataPopup(initialState, {})
    ).toEqual(initialState);
  });

  it('should show on a screen', () => {
    const stateAfterChange = {
      visible: true,
      point: {
        x: 10,
        y: 10
      }
    };

    let newState = dataPopup(initialState, {
      type: types.POPUP_SHOW,
      point: {
        x: 10,
        y: 10
      }
    });
    expect(newState).toEqual(stateAfterChange);

    // if we call it again but popup is shown than no change is observed
    expect(
      dataPopup(newState, {
        type: types.POPUP_SHOW,
        point: {
          x: 10,
          y: 10
        }
      })
    ).toEqual(stateAfterChange);
  });
});
