
import { Figure } from '../../types/Figure';
import { SWITCH_PLAYER, SET_PLAYER_FIELD, SELECT_FIGURE, MOVE_FIGURE } from './actions';

const initialState = {
  boardSize: 6,
  activePlayer: 0,
  firstPlayerFigures: [
    {
      name: 'Zászló',
      count: 1,
      num: -1,
      col: 0,
      row: 4
    },
    {
      name: 'Ezredes',
      count: 1,
      num: 8,
      col: 1,
      row: 4
    },
    {
      name: 'Kapitány',
      count: 1,
      num: 6,
      col: 2,
      row: 4
    },
    {
      name: 'Tábornagy',
      count: 1,
      num: 10,
      col: 3,
      row: 4
    },
    {
      name: 'Aknász',
      count: 2,
      num: 3,
      col: 4,
      row: 4
    },
    {
      name: 'Aknász',
      count: 1,
      num: 3,
      col: 5,
      row: 4
    },
    {
      name: 'Felderítő',
      count: 2,
      num: 2,
      col: 0,
      row: 5
    },
    {
      name: 'Felderítő',
      count: 1,
      num: 2,
      col: 1,
      row: 5
    },
    {
      name: 'Kém',
      count: 1,
      num: 1,
      col: 2,
      row: 5
    },
    {
      name: 'Őrmester',
      count: 1,
      num: 4,
      col: 3,
      row: 5
    },
    {
      name: 'Bomba',
      count: 2,
      num: 0,
      col: 4,
      row: 5
    },
    {
      name: 'Bomba',
      count: 1,
      num: 0,
      col: 5,
      row: 5
    }
  ],
  secondPlayerFigures: [
    {
      name: 'Zászló',
      count: 1,
      num: -1,
      col: 5,
      row: 1
    },
    {
      name: 'Ezredes',
      count: 1,
      num: 8,
      col: 4,
      row: 1
    },
    {
      name: 'Kapitány',
      count: 1,
      num: 6,
      col: 3,
      row: 1
    },
    {
      name: 'Tábornagy',
      count: 1,
      num: 10,
      col: 2,
      row: 1
    },
    {
      name: 'Aknász',
      count: 2,
      num: 3,
      col: 1,
      row: 1
    },
    {
      name: 'Aknász',
      count: 1,
      num: 3,
      col: 0,
      row: 1
    },
    {
      name: 'Felderítő',
      count: 2,
      num: 2,
      col: 5,
      row: 0
    },
    {
      name: 'Felderítő',
      count: 1,
      num: 2,
      col: 4,
      row: 0
    },
    {
      name: 'Kém',
      count: 1,
      num: 1,
      col: 3,
      row: 0
    },
    {
      name: 'Őrmester',
      count: 1,
      num: 4,
      col: 2,
      row: 0
    },
    {
      name: 'Bomba',
      count: 2,
      num: 0,
      col: 1,
      row: 0
    },
    {
      name: 'Bomba',
      count: 1,
      num: 0,
      col: 0,
      row: 0
    }
  ],
  availableFields: []
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

    if(type === SELECT_FIGURE) {
      let temp = [];
      const currentPlayer = state.activePlayer === 0 ? 'firstPlayerFigures' : 'secondPlayerFigures';
      state[currentPlayer].forEach(f => {
        if(f.col === payload.col && f.row === payload.row) {
          f.selected = true;
        } else {
          f.selected = false;
        }
      });
      if(payload.col < state.boardSize - 1) temp.push({row: payload.row, col: payload.col + 1});
      if(payload.col > 0) temp.push({row: payload.row, col: payload.col - 1});
      if(payload.row < state.boardSize - 1) temp.push({row: payload.row + 1, col: payload.col});
      if(payload.row > 0) temp.push({row: payload.row - 1, col: payload.col});
      temp = temp.filter(f => !state[currentPlayer].find(ff => ff.row === f.row && ff.col === f.col));
      return {...state, availableFields: temp};
    }

    if(type === MOVE_FIGURE) {
      const currentPlayer = state.activePlayer === 0 ? 'firstPlayerFigures' : 'secondPlayerFigures';
      const otherPlayer = state.activePlayer === 0 ? 'secondPlayerFigures' : 'firstPlayerFigures';
      state[currentPlayer].forEach(f => {
        if(f.selected && state.availableFields.find(af => af.col === payload.col && af.row === payload.row)) {
          const otherPlayerField = state[otherPlayer].find(of => of.col === payload.col && of.row === payload.row);
          // TODO ez meg nem jo
          if(otherPlayerField) {
            setTimeout(function() {
              if(otherPlayerField.num > f.num) {
                f.lost = true;
              } else {
                otherPlayerField.lost = true;
              }
            }, 3000);
          } else {
            f.row = payload.row;
            f.col = payload.col;
            f.selected = false;
          }
        }
      });
      return {...state, firstPlayerFigures: state.firstPlayerFigures, availableFields: [], activePlayer: state.activePlayer === 0 ? 1 : 0};
    }

    return state;
  }