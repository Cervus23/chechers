import React, { useState } from 'react';
import { connect } from 'react-redux';
import Checker from '../Checker';
import { createMap, createActivePath, move } from '../../engine/mapRenderer';
import { BLACK_CHECKER, KING, WHITE_CHECKER, SEPARATOR, EMPTY_CELL } from '../../engine/types';
import { START_MOVE, SELECTED_CHECKER } from '../../engine/phases';
import './style.css';

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

const GameMap = ({ width, height }) => {
  const [map, setMap] = useState(createMap({ width, height }));
  const [activeIndex, setActiveIndex] = useState([null, null]);
  const [phase, setPhase] = useState(START_MOVE);
  const [moveCounter, setMoveCounter] = useState(0);
  const [moveTurn, setMoveTurn] = useState(WHITE_CHECKER);

  const activePath = createActivePath({ map, activeIndex });
  const isActive = ([i, j]) => (
    (activeIndex[0] === i && activeIndex[1] === j) || activePath.has(`${i}${SEPARATOR}${j}`)
  );
  const onClickHandler = ([i, j]) => {
    // When clicked on an active checker - reset selection and go to the START_MOVE stage.
    if (activeIndex[0] === i && activeIndex[1] === j) {
      setPhase(START_MOVE);
      setActiveIndex([null, null]);

      return;
    }

    const destination = map[i][j];

    // Ignore clicks on empty cells
    if (destination === EMPTY_CELL && phase === START_MOVE) {
      return;
    }

    // Attempt to move.
    if (destination === EMPTY_CELL && phase === SELECTED_CHECKER) {
      // If destination is not withing the allowed active path - do nothing.
      if (activePath.has(`${i}${SEPARATOR}${j}`) === false) {
        return;
      }

      const newMap = move({ map, from: activeIndex, to: [i, j] });

      setPhase(START_MOVE);
      setMap(newMap);
      setActiveIndex([null, null]);
      setMoveCounter(moveCounter + 1);
      setMoveTurn(moveTurn === BLACK_CHECKER ? WHITE_CHECKER : BLACK_CHECKER);

      return;
    }

    // If a checker is selected not in the correct move turn.
    if (moveTurn !== destination) {
      return;
    }

    setPhase(SELECTED_CHECKER);
    setActiveIndex([i, j]);
  };

  return (
    <div className="main-container">
      <div>
        <div>Move #{moveCounter + 1}</div>
        <div>Turn: {moveTurn === WHITE_CHECKER ? 'White' : 'Black'}</div>
      </div>
      <div className="map">
        {map.map((row, i) => (
          <div className="row" key={i}>
            {row.map((symbol, j) => (
              <div
                onClick={() => onClickHandler([i, j])}
                className={'cell' + (isActive([i, j]) ? ' active' : '')}
                key={j}
              >
                <Element
                  symbol={symbol}
                  isActive={isActive([i, j])}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default connect(state => ({ state }))(GameMap);
