export const NEXT_PHASE = 'NEXT_PHASE';
export const START_PHASE = 'START_PHASE';
export const CLEAR_ACTIVE_INDEX = 'CLEAR_ACTIVE_INDEX';
export const SET_ACTIVE_INDEX = 'SET_ACTIVE_INDEX';
export const INCREMENT_MOVES = 'INCREMENT_MOVES';
export const NEXT_TURN = 'NEXT_TURN';
export const SET_MAP = 'SET_MAP';
export const SET_ACTIVE_PATH = 'SET_ACTIVE_PATH';
export const SET_KING_INDEX = 'SET_KING_INDEX';
export const DECLARE_WIN = 'DECLARE_WIN';

export const nextPhase = () => ({ type: NEXT_PHASE });
export const startPhase = () => ({ type: START_PHASE });
export const clearActiveIndex = () => ({ type: CLEAR_ACTIVE_INDEX });
export const setActiveIndex = (payload) => ({
  type: SET_ACTIVE_INDEX,
  payload,
});
export const incrementMoves = () => ({ type: INCREMENT_MOVES });
export const nextMoveTurn = () => ({ type: NEXT_TURN });
export const setMap = (payload) => ({ type: SET_MAP, payload });
export const setActivePath = (payload) => ({ type: SET_ACTIVE_PATH, payload });
export const setKingIndex = (payload) => ({ type: SET_KING_INDEX, payload });
export const declareWin = () => ({ type: DECLARE_WIN });
