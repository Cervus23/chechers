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
