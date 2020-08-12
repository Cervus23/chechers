import { EMPTY_CELL, SEPARATOR } from './types';

const start = [
  '...xxx...',
  '....x....',
  '....0....',
  'x...0...x',
  'xx00M00xx',
  'x...0...x',
  '....0....',
  '....x....',
  '...xxx...',
];

// const start = [
//   '.........',
//   '.........',
//   '....MM...',
//   '.........',
//   '..M...M..',
//   '.........',
//   '....M....',
//   '.........',
//   '..x......',
// ];

export const createMap = ({ height, width }) =>
  start.map((row) => row.split(''));

export const createActivePath = ({ map, activeIndex }) => {
  const path = new Set();

  if (activeIndex[0] === null || activeIndex[1] === null) {
    return path;
  }

  // Down
  for (let i = activeIndex[0] + 1; i < map.length; i++) {
    if (
      map[i][activeIndex[1]] !== EMPTY_CELL ||
      (i === 4 && activeIndex[1] === 4 && map[4][4] === EMPTY_CELL)
    ) {
      break;
    }

    path.add(`${i}${SEPARATOR}${activeIndex[1]}`);
  }

  // Up
  for (let i = activeIndex[0] - 1; i >= 0; i--) {
    if (
      map[i][activeIndex[1]] !== EMPTY_CELL ||
      (i === 4 && activeIndex[1] === 4 && map[4][4] === EMPTY_CELL)
    ) {
      break;
    }

    path.add(`${i}${SEPARATOR}${activeIndex[1]}`);
  }

  // Right
  for (let i = activeIndex[1] + 1; i < map[0].length; i++) {
    if (
      map[activeIndex[0]][i] !== EMPTY_CELL ||
      (i === 4 && activeIndex[0] === 4 && map[4][4] === EMPTY_CELL)
    ) {
      break;
    }

    path.add(`${activeIndex[0]}${SEPARATOR}${i}`);
  }

  // Left
  for (let i = activeIndex[1] - 1; i >= 0; i--) {
    if (
      map[activeIndex[0]][i] !== EMPTY_CELL ||
      (i === 4 && activeIndex[0] === 4 && map[4][4] === EMPTY_CELL)
    ) {
      break;
    }

    path.add(`${activeIndex[0]}${SEPARATOR}${i}`);
  }
  return path;
};

export const move = ({ map, from, to }) => {
  const newMap = JSON.parse(JSON.stringify(map));
  const currentChecker = newMap[from[0]][from[1]];

  const getSide = (position) => {
    const checker = {
      type: position,
      side: null,
    };

    switch (checker.type) {
      case '0':
        checker.side = 'white';
        break;
      case 'M':
        checker.side = 'white';
        break;
      case 'x':
        checker.side = 'black';
        break;
      default:
        checker.side = null;
    }

    return checker.side;
  };

  newMap[from[0]][from[1]] = EMPTY_CELL;
  newMap[to[0]][to[1]] = map[from[0]][from[1]];

  // Up to down check
  if (to[0] + 1 < newMap.length && to[0] + 2 < newMap.length) {
    if (
      getSide(currentChecker) !== getSide(newMap[to[0] + 1][to[1]]) &&
      getSide(currentChecker) === getSide(newMap[to[0] + 2][to[1]])
    ) {
      newMap[to[0] + 1][to[1]] = EMPTY_CELL;
    }
  }

  // Down to up check
  if (to[0] - 1 > 0 && to[0] - 2 >= 0) {
    if (
      getSide(currentChecker) !== getSide(newMap[to[0] - 1][to[1]]) &&
      getSide(currentChecker) === getSide(newMap[to[0] - 2][to[1]])
    ) {
      newMap[to[0] - 1][to[1]] = EMPTY_CELL;
    }
  }

  // Left to right check
  if (to[1] + 1 < newMap.length && to[1] + 2 < newMap.length) {
    if (
      getSide(currentChecker) !== getSide(newMap[to[0]][to[1] + 1]) &&
      getSide(currentChecker) === getSide(newMap[to[0]][to[1] + 2])
    ) {
      newMap[to[0]][to[1] + 1] = EMPTY_CELL;
    }
  }

  // Right to left check
  if (to[1] - 1 > 0 && to[1] - 2 >= 0) {
    if (
      getSide(currentChecker) !== getSide(newMap[to[0]][to[1] - 1]) &&
      getSide(currentChecker) === getSide(newMap[to[0]][to[1] - 2])
    ) {
      newMap[to[0]][to[1] - 1] = EMPTY_CELL;
    }
  }

  return newMap;
};
