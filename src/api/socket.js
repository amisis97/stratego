import io from 'socket.io-client'
import { setRoom } from '../state/room/actions';
import { setView } from '../state/view/actions';
import { setPlayerId } from '../state/game/actions';

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
      }
    });
  }

  joinRoom(roomId, dispatch) {
    this.socket.on('room-is-full', response => {
      console.log(response);
      dispatch(setPlayerId(response.player));
      dispatch(setView('PREPARE_GAME'));
    })
    this.socket.emit('join-room', roomId, response => {
      if (response.status === 'ok') {
        dispatch(setRoom(roomId));
      }
    });
  }
  /*onReceiveMessage(callback) {
    const listener = message => {
      if (socket.id !== message.emitter) {
        callback(message)
      }
    }
    socket.on('messages created', listener)
    return () => socket.off('messages created', listener)
  }*/
}

export const socketApi = new SocketApi()