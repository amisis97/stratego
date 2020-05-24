import { GRAB_FIGURE, SET_FIGURE } from "./actions";
import { Figure } from '../../types/Figure';

const initialState = {
  availableFigures: [
    new Figure('Zászló', 1, -1),
    new Figure('Tábornagy', 1, 10),
    // new Figure('Tábornok', 1, 9),
    new Figure('Ezredes', 1, 8),
    // new Figure('Őrnagy', 3, 7),
    new Figure('Kapitány', 1, 6),
    // new Figure('Főhadnagy', 4, 5),
    new Figure('Őrmester', 1, 4),
    new Figure('Aknász', 2, 3),
    new Figure('Felderítő', 2, 2),
    new Figure('Kém', 1, 1),
    new Figure('Bomba', 2, 0)
  ],
  grabFigure: null,
  setFigures: []
}

export const prepareReducer = (state = initialState, action) => {
    const { type, payload } = action
  
    if (type === GRAB_FIGURE) {
      state.grabFigure = payload
      return state;
    }

    if (type === SET_FIGURE) {
      if(state.grabFigure != null) {
        state.setFigures = [...state.setFigures, {...state.grabFigure, ...payload}];
        state.availableFigures = state.availableFigures.filter(f => {
          if(f.num !== state.grabFigure.num) {
            return true;
          } else {
            if(f.count > 1) {
              f.count--;
              return true;
            }
            return false;
          }
        });
        state.grabFigure = null;
      }
      return state;
    }


  
    return state;
  }