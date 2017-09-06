import {CHOOSE_CARD, CHECK_MATCHES} from '../constants/ActionTypes';
import faces from '../data/faces.json';
import update from 'immutability-helper';

const takeOne = function (items) {
  const itemIndex = Math.floor(Math.random() * items.length);
  const item = Object.assign({}, items[itemIndex]);

  items.splice(itemIndex, 1);

  return item;
};

const getRow = function (width, deck, index) {
  return Array.from(Array(width)).map((column, columnIndex) => {
    return Object.assign({}, takeOne(deck), {row: index, column: columnIndex});
  });
};

const getDeck = function (count) {
  return Array.from(Array((count) / 2)).reduce(r => {
    const id = r.length / 2;

    const faceIndex = Math.floor(Math.random() * faces.length);
    const face = faces[faceIndex];
    faces.splice(faceIndex, 1);

    const cardA = Object.assign({side: 'a', id, shown: false}, face);
    const cardB = Object.assign({side: 'b', id, shown: false}, face);

    r.push(cardA, cardB);

    return r;
  }, []);
};

const getGrid = function (height, width) {
  if (height * width % 2 !== 0) {
    throw Error('Odd number of cells: matches won\'t be in pairs, aborting..');
  }

  const deck = getDeck(height * width);
  return Array.from(Array(height)).map(
    (row, rowIndex) => getRow(width, deck, rowIndex));
};

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

  let unmatchedCount = state.map(
    // For each row.
    row => row.reduce(
      // For each colum return the cards that are shown.
      (sum, value) => sum + (value.matched ? 0 : 1), 0))
      // Reduce from rows and columns to just a flat array.
      .reduce((a, b) => a + b, 0);

  switch (action.type) {
    case CHOOSE_CARD:
      if (currentGuesses.length < 2) {
        updateWith = cardUpdater(action, {
          $merge: {
            shown: true
          }
        });
        currentGuesses.push(state[action.row][action.column]);
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
      unmatchedCount -= 2;

      if (unmatchedCount === 0) {
        return getGrid(4, 6);
      }
      return update(state, updateWith);
    default:
      return state;
  }
}
