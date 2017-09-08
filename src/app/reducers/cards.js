import {CHOOSE_CARD, CHECK_MATCHES, NEW_GAME} from '../constants/ActionTypes';
import getGrid from '../grid';
// Update enables you to build objects that tweak a state without actually
// mutating it.
import update from 'immutability-helper';

// Build the mutation, which update() will apply to our state.
const cardUpdater = function (card, update, updateArrayWith = {}) {
  if (!updateArrayWith[card.row]) {
    updateArrayWith[card.row] = {};
  }

  if (updateArrayWith[card.row][card.column]) {
    Object.assign(updateArrayWith[card.row][card.column], update);
  } else {
    updateArrayWith[card.row][card.column] = update;
  }

  return updateArrayWith;
};

const initialState = getGrid(4, 6);

export default function cards(state = initialState, action) {
  let updateWith = {};
  const currentGuesses = state.map(
    // For each row.
    row => row.filter(
      // For each colum return the cards that are shown.
      card => !card.matched && card.shown))
      // Reduce from rows and columns to just a flat array.
      .reduce((a, b) => b.concat(a), []);

  switch (action.type) {
    case NEW_GAME:

      return getGrid(4, 6);
    case CHOOSE_CARD:
      if (currentGuesses.length < 2) {
        updateWith = cardUpdater(action, {
          $merge: {
            shown: true
          }
        });
      }

      return update(state, updateWith);
    case CHECK_MATCHES:
      if (currentGuesses.length === 2) {
        // Build the mutation, which update() will apply to our state.
        if (currentGuesses[0].id === currentGuesses[1].id) {
          currentGuesses.forEach(card => {
            updateWith = cardUpdater(card, {
              $merge: {
                matched: true
              }
            }, updateWith);
          });
        } else {
          currentGuesses.forEach(card => {
            updateWith = cardUpdater(card, {
              $merge: {
                shown: false
              }
            }, updateWith);
          });
        }
      }

      return update(state, updateWith);
    default:
      return state;
  }
}
