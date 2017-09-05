import * as types from '../constants/ActionTypes';

export function chooseCard(row, column) {
  return {type: types.CHOOSE_CARD, row, column};
}
export function checkMatches() {
  return {type: types.CHECK_MATCHES};
}
