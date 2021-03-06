import io from 'socket.io-client'
import { setRoom } from '../state/room/actions';
import { setView } from '../state/view/actions';
import { setPlayerId, setPlayerField, setActivePlayer, resetGame } from '../state/game/actions';
import { resetPrepare } from '../state/prepare/actions';

class SocketApi {
  constructor() {
    this.socket = io('http://webprogramozas.inf.elte.hu:3030/');
  }

  connect() {
    this.socket.connect();
  }

  createRoom(dispatch) {
    this.socket.emit('create-room', response => {
      if (response.status === 'ok') {
        dispatch(setRoom(response.roomId));
        dispatch(setView('WAITING_FOR_SECOND_PLAYER'));
        this.socket.on('room-is-full', response => {
          console.log(response);
          dispatch(setPlayerId(response.player));
          dispatch(setView('PREPARE_GAME'));
        });
        this.stateChanged(dispatch);
      }
    });
    this.socket.on('player-left', response => {
      console.log(response);
      dispatch(setView('MAIN_PAGE'));
      dispatch(resetGame());
      dispatch(resetPrepare());
    });
  }

  joinRoom(roomId, dispatch) {
    this.socket.on('room-is-full', response => {
      console.log(response);
      dispatch(setPlayerId(response.player));
      dispatch(setView('PREPARE_GAME'));
    });
    this.socket.on('player-left', response => {
      console.log(response);
      dispatch(setView('MAIN_PAGE'));
    });
    this.stateChanged(dispatch);
    this.socket.emit('join-room', roomId, response => {
      if (response.status === 'ok') {
        dispatch(setRoom(roomId));
      }
    });
  }

  savePrepare(roomId, state, dispatch) {
    this.socket.emit('sync-state', roomId, state, false, function(response) {
      console.log(response);
    });
  }

  saveState(roomId, state, dispatch) {
    this.socket.emit('sync-state', roomId, state, false, function(response) {
      console.log(response);
    });
  }

  stateChanged(dispatch) {
    this.socket.on('state-changed', response => {
      console.log(response);
      if(response.state.playerId === 1) {
        dispatch(setPlayerField({playerId: response.state.playerId, figures: response.state.firstPlayerFigures}));
      } else {
        dispatch(setPlayerField({playerId: response.state.playerId, figures: response.state.secondPlayerFigures}));
      }
      dispatch(setActivePlayer(response.state.activePlayer));
      if(response.state.firstPlayerFigures.length > 0 && response.state.secondPlayerFigures.length > 0) {
        dispatch(setView('IN_GAME'));
      }
    });
  }

  leaveRoom(roomId, dispatch) {
    this.socket.emit('leave-room', roomId, function(response) {
      dispatch(setView('MAIN_PAGE'));
      dispatch(resetGame());
      dispatch(resetPrepare());
    });
  }
}

export const socketApi = new SocketApi()