export const getActivePlayer = state => state.game.activePlayer;
export const getFirstPlayerFigures = state => state.game.firstPlayerFigures;
export const getSecondPLayerFigures = state => state.game.secondPlayerFigures;
export const getFirstPlayerLostFigures = state => state.game.firstPlayerFigures.filter(f => f.lost);
export const getSecondPlayerLostFigures = state => state.game.secondPlayerFigures.filter(f => f.lost);