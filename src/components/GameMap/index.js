import React from 'react';
import { connect } from 'react-redux';
import { createActivePath, move } from '../../engine/mapRenderer';
import { WHITE_CHECKER, SEPARATOR, EMPTY_CELL } from '../../engine/types';
import { START_MOVE, SELECTED_CHECKER } from '../../engine/phases';
import './style.css';
import CellElement from '../CellElement';
import {
  nextPhase,
  startPhase,
  clearActiveIndex,
  setActiveIndex,
  incrementMoves,
  nextMoveTurn,
  setMap,
  setActivePath,
} from '../../store/actions';

const GameMap = ({
  phase,
  activeIndex,
  moveCounter,
  moveTurn,
  map,
  activePath,
  toStartMove,
  makeMove,
  selectChecker,
}) => {
  const isActive = ([i, j]) => (
    (activeIndex[0] === i && activeIndex[1] === j) || activePath.has(`${i}${SEPARATOR}${j}`)
  );
  const onClickHandler = ([i, j]) => {
    // When clicked on an active checker - reset selection and go to the START_MOVE stage.
    if (activeIndex[0] === i && activeIndex[1] === j) {
      toStartMove();

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

      makeMove({ map, from: activeIndex, to: [i, j] });

      return;
    }

    // If a checker is selected not in the correct move turn.
    if (moveTurn !== destination) {
      return;
    }

    selectChecker({ map, activeIndex: [i, j] });
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
                <CellElement symbol={symbol} isActive={isActive([i, j])} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ phase, activeIndex, moveCounter, moveTurn, map, activePath }) => ({
  phase,
  activeIndex,
  moveCounter,
  moveTurn,
  map,
  activePath,
});
const mapDispatchToProps = (dispatch) => ({
  toStartMove: (payload) => {
    dispatch(startPhase());
    dispatch(clearActiveIndex());
    dispatch(
      setActivePath(
        createActivePath({ map: payload, activeIndex: [null, null] })
      )
    );
  },
  makeMove: ({ map, from, to }) => {
    const newMap = move({ map, from, to });

    dispatch(startPhase());
    dispatch(setMap(newMap));
    dispatch(clearActiveIndex());
    dispatch(incrementMoves());
    dispatch(nextMoveTurn());
    dispatch(
      setActivePath(
        createActivePath({ map: newMap, activeIndex: [null, null] })
      )
    );
  },
  selectChecker: ({ map, activeIndex }) => {
    dispatch(nextPhase());
    dispatch(setActiveIndex(activeIndex));
    dispatch(
      setActivePath(
        createActivePath({ map, activeIndex })
      )
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GameMap);
