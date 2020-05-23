import React, { useState } from 'react';
import './Home.css';
import { Header, Modal, Input } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { setView } from '../../state/view/actions';

const ConnectRoomModal = () => {

  const [roomState, setRoomState] = useState('');
  const dispatch = useDispatch();

  const enterGame = event => {
    event.preventDefault();
    dispatch(setView('PREPARE_GAME'));
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
          <Input value={roomState} onChange={handleChange} name="room-num" type="number" className="room-num" label='#' placeholder='Add meg a szoba számát...' />
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
      <button onClick={() => dispatch(setView("WAITING_FOR_SECOND_PLAYER"))} className="btn box">Új játék</button>
      <ConnectRoomModal/>
    </div>
  )
}