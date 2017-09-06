import * as types from '../constants/ActionTypes';
import * as actions from './index';

describe('card actions', () => {
  it('chooseCard should create CHOOSE_CARD action', () => {
    expect(actions.chooseCard(0, 1)).toEqual({
      type: types.CHOOSE_CARD,
      row: 0,
      column 1
    });
  });

  it('checkMatches should create CHECK_MATCHES action', () => {
    expect(actions.checkMatches()).toEqual({
      type: types.CHECK_MATCHES
    });
  });
});
