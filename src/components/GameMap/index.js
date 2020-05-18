import React, { useState } from 'react';
import { connect } from 'react-redux';
import './style.css';
import { createMap } from '../../engine/mapRenderer';
import Checker from '../Checker';

const WHITE_CHECKER = '0';
const BLACK_CHECKER = 'x';
const KING = 'M';

const Element = ({ symbol, isActive, ...props }) => {
  switch (symbol) {
    case WHITE_CHECKER:
      return <Checker className="white-checker" isActive={isActive} {...props} />;
    case BLACK_CHECKER:
      return <Checker className="black-checker" isActive={isActive} {...props} />;
    case KING:
      return <Checker className="king-checker" isActive={isActive} {...props} />;
    default:
      return null;
  }
};

const createActivePath = ({ map, activeIndex }) => {
  const path = new Set();

  if (activeIndex[0] === null || activeIndex[1] === null) {
    return path;
  }

  // Down
  for (let i = activeIndex[0] + 1; i < map.length; i++) {
    path.add(`${i}_${activeIndex[1]}`);
  }

  // Up
  for (let i = activeIndex[0] - 1; i >= 0; i--) {
    path.add(`${i}_${activeIndex[1]}`);
  }

  // Right
  for (let i = activeIndex[1] + 1; i < map[0].length; i++) {
    path.add(`${activeIndex[0]}_${i}`);
  }

  // Left
  for (let i = activeIndex[1] - 1; i >= 0; i--) {
    path.add(`${activeIndex[0]}_${i}`);
  }

  return path;
};

const GameMap = ({ width, height }) => {
  const map = createMap({ width, height });
  const [activeIndex, setActiveIndex] = useState([null, null]);
  const activePath = createActivePath({ map, activeIndex });
  const isActive = ([i, j]) => (
    (activeIndex[0] === i && activeIndex[1] === j) || (activePath.has(`${i}_${j}`))
  );

  console.log(activePath);

  return (
    <div className="map">
      {map.map((row, i) => (
        <div className="row" key={i}>
          {row.map((symbol, j) => (
            <div className={'cell' + (isActive([i, j]) ? ' active' : '')} key={j}>
              <Element
                symbol={symbol}
                isActive={isActive([i, j])}
                onClick={() => setActiveIndex([i, j])}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default connect(state => ({ state }))(GameMap);
