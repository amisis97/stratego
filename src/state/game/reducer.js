
import { SWITCH_PLAYER, SET_PLAYER_FIELD, SELECT_FIGURE, MOVE_FIGURE, SET_PLAYER_ID, RESET_GAME } from './actions';

const initialState = {
  boardSize: 6,
  activePlayer: 1,
  firstPlayerFigures: [],
  secondPlayerFigures: [],
  availableFields: [],
  playerId: null
}

export const gameReducer = (state = initialState, action) => {
    const { type, payload } = action

    if (type === SET_PLAYER_ID) {
      return {...state, playerId: payload};
    }
    
    if (type === SWITCH_PLAYER) {
      state.activePlayer = payload;
      return state;    
    }

    if(type === SET_PLAYER_FIELD) {
      if(payload.playerId === 1) return {...state, firstPlayerFigures: payload.figures};
      else return {...state, secondPlayerFigures: payload.figures};
    }

    if(type === SELECT_FIGURE) {
      let temp = [];
      const currentPlayer = state.activePlayer === 1 ? 'firstPlayerFigures' : 'secondPlayerFigures';
      const otherPlayer = state.activePlayer === 2 ? 'firstPlayerFigures' : 'secondPlayerFigures';
      state[currentPlayer].forEach(f => {
        if(f.col === payload.col && f.row === payload.row) {
          f.selected = true;
        } else {
          f.selected = false;
        }
      });
      state[otherPlayer].forEach(f => {
        f.selected = false;
      });
      if(payload.col < state.boardSize - 1) temp.push({row: payload.row, col: payload.col + 1});
      if(payload.col > 0) temp.push({row: payload.row, col: payload.col - 1});
      if(payload.row < state.boardSize - 1) temp.push({row: payload.row + 1, col: payload.col});
      if(payload.row > 0) temp.push({row: payload.row - 1, col: payload.col});
      temp = temp.filter(f => !state[currentPlayer].find(ff => ff.row === f.row && ff.col === f.col));
      return {...state, availableFields: temp};
    }

    if(type === MOVE_FIGURE) {
      const currentPlayer = state.activePlayer === 1 ? 'firstPlayerFigures' : 'secondPlayerFigures';
      const otherPlayer = state.activePlayer === 1 ? 'secondPlayerFigures' : 'firstPlayerFigures';
      state[currentPlayer].forEach(f => {
        if(f.selected && state.availableFields.find(af => af.col === payload.col && af.row === payload.row)) {
          const otherPlayerField = state[otherPlayer].find(of => of.col === payload.col && of.row === payload.row);
          if(!otherPlayerField) {
            f.row = payload.row;
            f.col = payload.col;
            f.selected = false;
          } else {
            if(otherPlayerField.num === -1) {
              alert('Vége a játéknak! Gyozott: ' + (state.activePlayer) + 'jatekos');
            }
            else if(otherPlayerField.num > f.num) {
              f.lost = true;
            } else if(otherPlayerField.num < f.num) {
              f.row = payload.row;
              f.col = payload.col;
              f.selected = false;
              otherPlayerField.lost = true;
            } else {
              f.lost = true;
              otherPlayerField.lost = true;
            }
          }
        }
      });
      return {...state, firstPlayerFigures: state.firstPlayerFigures, secondPlayerFigures: state.secondPlayerFigures, availableFields: []};
    }

    if(type === RESET_GAME) {
      return initialState;
    }

    return state;
  }