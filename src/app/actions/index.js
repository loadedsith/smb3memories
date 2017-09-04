import * as types from '../constants/ActionTypes';

export function chooseCard(address) {
  return {type: types.CHOOSE_CARD, address};
}
