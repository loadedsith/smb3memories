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
    throw Error('Odd number of cells, matching wont work.');
  }

  const deck = getDeck(height * width);

  const grid = Array.from(Array(height)).map((row, rowIndex) => getRow(width, deck, rowIndex));

  return grid;
};

const initialState = getGrid(4, 6);

export default function cards(state = initialState, action) {
  const updateArrayWith = {};
  const currentGuesses = state.map(
    // For each row.
    row => row.filter(
      // For each colum return the cards that are shown.
      card => card.shown && !card.matched))
      // Reduce from rows and columns to just a flat array.
      .reduce((a, b) => b.concat(a), []);

  switch (action.type) {
    case CHOOSE_CARD:
      if (currentGuesses.length < 2) {
        // Build the mutation, which update() will apply to our state.
        updateArrayWith[action.row] = {};
        updateArrayWith[action.row][action.column] = {
          $merge: {
            shown: true
          }
        };

        currentGuesses.push(state[action.row][action.column]);
      }

      return update(state, updateArrayWith);
    case CHECK_MATCHES:
      if (currentGuesses.length === 2) {
        console.log('currentGuesses.length == 2', currentGuesses.length === 2);

        if (currentGuesses[0].id === currentGuesses[1].id) {
          updateArrayWith[currentGuesses[0].row] = {};
          updateArrayWith[currentGuesses[0].row][currentGuesses[0].column] = {
            $merge: {
              matched: true
            }
          };

          updateArrayWith[currentGuesses[1].row] = {};
          updateArrayWith[currentGuesses[1].row][currentGuesses[1].column] = {
            $merge: {
              matched: true
            }
          };
        } else {
          console.log('currentGuesses', currentGuesses, currentGuesses.length);
          updateArrayWith[currentGuesses[0].row] = {};
          updateArrayWith[currentGuesses[0].row][currentGuesses[0].column] = {
            $merge: {
              shown: false
            }
          };

          updateArrayWith[currentGuesses[1].row] = {};
          updateArrayWith[currentGuesses[1].row][currentGuesses[1].column] = {
            $merge: {
              shown: false
            }
          };
        }
      }

      return update(state, updateArrayWith);
    default:
      return state;
  }
}
