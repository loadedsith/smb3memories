// import {ADD_TODO} from '../constants/ActionTypes';

const getRow = function (width, deck) {
  const row = Array.from(Array(width)).map(() => {
    const cardIndex = Math.floor(Math.random() * deck.length);
    const card = String(deck[cardIndex]);

    deck.splice(cardIndex, 1);
    return card;
  });

  return row;
};

const getGrid = function (height, width) {
  if (height * width % 2 !== 0) {
    throw Error('Odd number of cells, matching wont work.');
  }

  const deck = Array.from(Array((height * width) / 2)).reduce(r => {
    const id = r.length / 2;
    r.push('a' + id, 'b' + id);
    return r;
  }, []);

  return Array.from(Array(height)).map(() => getRow(width, deck));
};

const initialState = [
  {
    grid: getGrid(3, 6)
  }
];

export default function cards(state = initialState, action) {
  console.log('action', action);
  switch (action.type) {
    default:
      return state;
  }
}
