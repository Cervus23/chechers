import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createActivePath, beatChecker, move } from '../../engine/mapRenderer';
import {
  SEPARATOR,
  EMPTY_CELL,
  KING,
  WHITE_CHECKER,
  BLACK_CHECKER,
} from '../../engine/types';
import { WHITE, BLACK } from '../../engine/turns';
import { START_MOVE, SELECTED_CHECKER } from '../../engine/movePhases';
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
  setKingIndex,
  declareWin,
} from '../../store/actions';

const GameMap = ({
  phase,
  gameStage,
  activeIndex,
  moveCounter,
  moveTurn,
  map,
  activePath,
  toStartMove,
  reselectChecker,
  makeMove,
  selectChecker,
  kingIndex,
  winGame,
  setKingPosition,
  beatCheck,
}) => {
  const isActive = ([i, j]) =>
    (activeIndex[0] === i && activeIndex[1] === j) ||
    activePath.has(`${i}${SEPARATOR}${j}`);

  useEffect(() => {
    if (
      kingIndex[0] === 0 ||
      kingIndex[0] === map[0].length - 1 ||
      kingIndex[1] === 0 ||
      kingIndex[1] === map.length - 1
    ) {
      winGame();
    }
  }, [kingIndex, map, winGame]);

  const onClickHandler = ([i, j]) => {
    // When clicked on an active checker - reset selection and go to the START_MOVE stage.
    if (activeIndex[0] === i && activeIndex[1] === j) {
      toStartMove();

      return;
    }

    const destination = {
      type: map[i][j],
      side: null,
    };

    switch (map[i][j]) {
      case WHITE_CHECKER:
        destination.side = WHITE;
        break;
      case KING:
        destination.side = WHITE;
        break;
      case BLACK_CHECKER:
        destination.side = BLACK;
        break;
      default:
        destination.side = null;
    }

    // Ignore clicks on empty cells
    if (destination.type === EMPTY_CELL && phase === START_MOVE) {
      return;
    }

    // Attempt to move.
    if (destination.type === EMPTY_CELL && phase === SELECTED_CHECKER) {
      // If destination is not withing the allowed active path - do nothing.
      if (activePath.has(`${i}${SEPARATOR}${j}`) === false) {
        return;
      }

      const currentChecker = map[activeIndex[0]][activeIndex[1]];

      if (currentChecker === KING) {
        setKingPosition([i, j]);
      }
      //beatCheck({ map, activeIndex });

      makeMove({ map, from: activeIndex, to: [i, j] });

      return;
    }

    // If a checker is selected not in the correct move turn.
    if (moveTurn !== destination.side) {
      return;
    }

    // If another checker is reselected in the correct move turn.
    if (moveTurn === destination.side && phase === SELECTED_CHECKER) {
      reselectChecker({ map, activeIndex: [i, j] });

      return;
    }
    selectChecker({ map, activeIndex: [i, j] });
  };

  return (
    <div className="main-container">
      <div>
        <div>Move #{moveCounter + 1}</div>
        <div>Turn: {moveTurn === WHITE ? 'White' : 'Black'}</div>
        <div> {gameStage}</div>
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

const mapStateToProps = ({
  phase,
  gameStage,
  kingIndex,
  activeIndex,
  moveCounter,
  moveTurn,
  map,
  activePath,
}) => ({
  phase,
  gameStage,
  kingIndex,
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
  winGame: () => {
    dispatch(declareWin());
  },
  reselectChecker: ({ map, activeIndex }) => {
    dispatch(setActiveIndex(activeIndex));
    dispatch(setActivePath(createActivePath({ map, activeIndex })));
  },
  selectChecker: ({ map, activeIndex }) => {
    dispatch(nextPhase());
    dispatch(setActiveIndex(activeIndex));
    dispatch(setActivePath(createActivePath({ map, activeIndex })));
  },
  setKingPosition: ([i, j]) => {
    dispatch(setKingIndex([i, j]));
  },
  beatCheck: ({ map, activeIndex }) => {
    const newMap = beatChecker({ map, activeIndex });

    dispatch(setMap(newMap));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GameMap);
