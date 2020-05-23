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

export const createMap = ({ height, width }) => start.map(row => row.split(''));

export const createActivePath = ({ map, activeIndex }) => {
  const path = new Set();

  if (activeIndex[0] === null || activeIndex[1] === null) {
    return path;
  }

  // Down
  for (let i = activeIndex[0] + 1; i < map.length; i++) {
    if (map[i][activeIndex[1]] !== EMPTY_CELL) {
      break;
    }

    path.add(`${i}${SEPARATOR}${activeIndex[1]}`);
  }

  // Up
  for (let i = activeIndex[0] - 1; i >= 0; i--) {
    if (map[i][activeIndex[1]] !== EMPTY_CELL) {
      break;
    }

    path.add(`${i}${SEPARATOR}${activeIndex[1]}`);
  }

  // Right
  for (let i = activeIndex[1] + 1; i < map[0].length; i++) {
    if (map[activeIndex[0]][i] !== EMPTY_CELL) {
      break;
    }

    path.add(`${activeIndex[0]}${SEPARATOR}${i}`);
  }

  // Left
  for (let i = activeIndex[1] - 1; i >= 0; i--) {
    if (map[activeIndex[0]][i] !== EMPTY_CELL) {
      break;
    }

    path.add(`${activeIndex[0]}${SEPARATOR}${i}`);
  }

  return path;
};

export const move = ({ map, from, to }) => {
  const newMap = JSON.parse(JSON.stringify(map));

  newMap[from[0]][from[1]] = EMPTY_CELL;
  newMap[to[0]][to[1]] = map[from[0]][from[1]];

  return newMap;
};
