import {CHOOSE_CARD} from '../constants/ActionTypes';
import faces from '../data/faces.json';
import update from 'immutability-helper';

console.log('faces', faces);

const takeOne = function (items) {
  const itemIndex = Math.floor(Math.random() * items.length);
  const item = Object.assign({}, items[itemIndex]);

  items.splice(itemIndex, 1);

  return item;
};

const getRow = function (width, deck) {
  return Array.from(Array(width)).map(() => takeOne(deck));
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

  const grid = Array.from(Array(height)).map(() => getRow(width, deck));

  return grid;
};

const initialState = [
  ...getGrid(4, 6)
];

export default function cards(state = initialState, action) {
  const updateArrayWith = {};
  // const currentGuesses = state.map(
  //   row => row.filter(
  //     card => card.shown === true))
  //   .filter(g => g.length > 0);

  switch (action.type) {
    case CHOOSE_CARD:

      // if (currentGuesses.length < 1) {
      updateArrayWith[action.address[0]] = {};
      updateArrayWith[action.address[0]][action.address[1]] = {
        $merge: {
          shown: !state[action.address[0]][action.address[1]].shown
        }
      };
      return update(state, updateArrayWith);
      // }
      // return state;
    default:
      return state;
  }
}
