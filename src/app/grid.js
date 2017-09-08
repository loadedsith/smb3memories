import faces from './data/faces.json';

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

export default getGrid;
