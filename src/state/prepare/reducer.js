import { GRAB_FIGURE, SET_FIGURE, REMOVE_FROM_SET, CREATE_ROOM } from "./actions";
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
        return {...state, grabFigure: state.grabFigure !== payload ? payload : null};
    }

    if (type === SET_FIGURE) {
      if(state.grabFigure != null) {
        // van e mar az adott mezon
        if(state.setFigures.some(f => f.row === payload.row && f.col === payload.col)) {
          return state;
        }
        // merge a beallitott mezok
        state.setFigures = [...state.setFigures, {...state.grabFigure, ...payload}];
        let stillSelected = false;
        // ha tobb darab van csak a mennyiseget kell csokkenteni
        state.availableFigures = state.availableFigures.filter(f => {
          if(f.num !== state.grabFigure.num) {
            return true;
          } else {
            if(f.count > 1) {
              f.count--;
              stillSelected = true;
              return true;
            }
            return false;
          }
        });
        state.grabFigure = stillSelected ? state.grabFigure : null;
      }
      return state;
    }

    if (type === REMOVE_FROM_SET) {
      // koordinata alapjan kikeresi
      const elem = state.setFigures.find(f => f.col === payload.col && f.row === payload.row);
      state.setFigures = state.setFigures.filter(f => f.col !== payload.col || f.row !== payload.row);
      let newElem = true;
      state.availableFigures.forEach(f => {
        if(f.num === elem.num) {
          f.count++;
          newElem = false;
        }
      });
      if(newElem) {
        state.availableFigures.push(new Figure(elem.name, 1, elem.num));
      }
      return state;
    }
  
    return state;
  }