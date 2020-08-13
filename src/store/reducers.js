import {
  CLEAR_ACTIVE_INDEX,
  INCREMENT_MOVES,
  NEXT_PHASE,
  NEXT_TURN,
  SET_ACTIVE_INDEX,
  SET_ACTIVE_PATH,
  SET_MAP,
  START_PHASE,
  SET_KING_INDEX,
  DECLARE_WIN,
} from './actions';
import { START_MOVE, PHASES } from '../engine/movePhases';
import { WHITE, BLACK } from '../engine/turns';
import { GAME, WIN } from '../engine/gameStage';
import { createMap } from '../engine/mapRenderer';

const mapParams = {
  width: 9,
  height: 9,
};
const centerRow = (mapParams.width - 1) / 2;
const centerCol = (mapParams.height - 1) / 2;
const initialState = {
  mapParams,
  phase: START_MOVE,
  activeIndex: [null, null],
  moveCounter: 0,
  moveTurn: WHITE,
  map: createMap(mapParams),
  activePath: new Set(),
  gameStage: GAME,
  kingIndex: [centerRow, centerCol],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case NEXT_PHASE:
      const nextIndex = PHASES.findIndex((phase) => state.phase === phase) + 1;
      const phase = PHASES[nextIndex] || PHASES[0];

      return { ...state, phase };
    case START_PHASE:
      return { ...state, phase: PHASES[0] };
    case CLEAR_ACTIVE_INDEX:
      return { ...state, activeIndex: [null, null] };
    case SET_ACTIVE_INDEX:
      return { ...state, activeIndex: payload };
    case INCREMENT_MOVES:
      return { ...state, moveCounter: state.moveCounter + 1 };
    case NEXT_TURN:
      return { ...state, moveTurn: state.moveTurn === BLACK ? WHITE : BLACK };
    case SET_MAP:
      return { ...state, map: payload };
    case SET_ACTIVE_PATH:
      return { ...state, activePath: payload };
    case SET_KING_INDEX:
      return { ...state, kingIndex: payload };
    case DECLARE_WIN:
      return { ...state, gameStage: WIN };
    default:
      return { ...state };
  }
};

export default reducer;
