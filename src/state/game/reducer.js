
import { Figure } from '../../types/Figure';
import { SWITCH_PLAYER, SET_PLAYER_FIELD } from './actions';

const initialState = {
  activePlayer: 0,
  firstPlayerFigures: [],
  secondPlayerFigures: []
}

export const gameReducer = (state = initialState, action) => {
    const { type, payload } = action
    
    if (type === SWITCH_PLAYER) {
      state.activePlayer = state.activePlayer === 0 ? 1 : 0;
      return state;    
    }

    if(type === SET_PLAYER_FIELD) {
      const secondPlayer = payload.map(f => {
        return {...f, col: 5 - f.col, row: 5 - f.row}
      });
      return {...state, firstPlayerFigures: payload, secondPlayerFigures: secondPlayer};
    }

    return state;
  }