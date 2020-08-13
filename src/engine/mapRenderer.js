import { BLACK_CHECKER, EMPTY_CELL, KING, SEPARATOR, WHITE_CHECKER } from './types';
import { BLACK, WHITE } from './turns';

// const start = [
//   '...xxx...',
//   '....x....',
//   '....0....',
//   'x...0...x',
//   'xx00M00xx',
//   'x...0...x',
//   '....0....',
//   '....x....',
//   '...xxx...',
// ];

const start = [
  '.........',
  '.........',
  '.........',
  '.........',
  '....M....',
  '.........',
  '..0......',
  '...x.....',
  '...0.....',
];

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

const getSide = (position) => {
  switch (position) {
    case WHITE_CHECKER:
      return WHITE;
    case KING:
      return WHITE;
    case BLACK_CHECKER:
      return BLACK;
    default:
      return null;
  }
};

export const move = ({ map, from, to }) => {
  const newMap = JSON.parse(JSON.stringify(map));
  const currentChecker = newMap[from[0]][from[1]];
  const currCheckerSide = getSide(currentChecker);

  newMap[from[0]][from[1]] = EMPTY_CELL;
  newMap[to[0]][to[1]] = map[from[0]][from[1]];

  // Up to down check
  if (to[0] + 1 < newMap.length && to[0] + 2 < newMap.length) {
    if (
      currCheckerSide !== getSide(newMap[to[0] + 1][to[1]]) &&
      currCheckerSide === getSide(newMap[to[0] + 2][to[1]])
    ) {
      newMap[to[0] + 1][to[1]] = EMPTY_CELL;
    }
  }

  // Down to up check
  if (to[0] - 1 > 0 && to[0] - 2 >= 0) {
    if (
      currCheckerSide !== getSide(newMap[to[0] - 1][to[1]]) &&
      currCheckerSide === getSide(newMap[to[0] - 2][to[1]])
    ) {
      newMap[to[0] - 1][to[1]] = EMPTY_CELL;
    }
  }

  // Left to right check
  if (to[1] + 1 < newMap.length && to[1] + 2 < newMap.length) {
    if (
      currCheckerSide !== getSide(newMap[to[0]][to[1] + 1]) &&
      currCheckerSide === getSide(newMap[to[0]][to[1] + 2])
    ) {
      newMap[to[0]][to[1] + 1] = EMPTY_CELL;
    }
  }

  // Right to left check
  if (to[1] - 1 > 0 && to[1] - 2 >= 0) {
    if (
      currCheckerSide !== getSide(newMap[to[0]][to[1] - 1]) &&
      currCheckerSide === getSide(newMap[to[0]][to[1] - 2])
    ) {
      newMap[to[0]][to[1] - 1] = EMPTY_CELL;
    }
  }

  return newMap;
};
