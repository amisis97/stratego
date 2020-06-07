import React, { useState } from 'react';
import './Home.css';
import { Header, Modal, Input } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { setView } from '../../state/view/actions';
import { socketApi } from '../../api/socket';

const ConnectRoomModal = () => {

  const [roomState, setRoomState] = useState('');
  const dispatch = useDispatch();

  const enterGame = event => {
    event.preventDefault();
    socketApi.joinRoom(roomState, dispatch);
  };

  const handleChange = e => {
    const value = e.target.value;
    setRoomState(value);
  }


  return (
    <Modal trigger={<button className="btn box">Csatlakozás szobához</button>} basic size='small'>
      <Header as="h1" content='Csatlakozás szobához' />
      <Modal.Content>
        <form className="enter-game-form" onSubmit={enterGame}>
          <Input value={roomState} onChange={handleChange} name="room-num" type="text" className="room-num" label='#' placeholder='Add meg a szoba számát...' />
          <div className="error"></div>
          <button>Belépés</button>
        </form>
      </Modal.Content>
    </Modal>
  );
}

export function Home() {
  const dispatch = useDispatch();
  return (
    <div className="home">
      <button onClick={() => socketApi.createRoom(dispatch)} className="btn box">Új játék</button>
      <ConnectRoomModal/>
    </div>
  )
}