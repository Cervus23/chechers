import {
  CLEAR_ACTIVE_INDEX,
  INCREMENT_MOVES,
  NEXT_PHASE,
  NEXT_TURN,
  SET_ACTIVE_INDEX, SET_ACTIVE_PATH,
  SET_MAP,
  START_PHASE
} from './actions';
import { START_MOVE, PHASES } from '../engine/phases';
import { WHITE, BLACK } from '../engine/turns';
import { createMap } from '../engine/mapRenderer';

const mapParams = {
  width: 9,
  height: 9,
};
const initialState = {
  mapParams,
  phase: START_MOVE,
  activeIndex: [null, null],
  moveCounter: 0,
  moveTurn: WHITE,
  map: createMap(mapParams),
  activePath: new Set(),
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
    default:
      return { ...state };
  }
};

export default reducer;
