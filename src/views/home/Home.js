import React, { useState } from 'react';
import './Home.css';
import { Header, Modal, Input } from 'semantic-ui-react';

const ConnectRoomModal = ({state, setState}) => {

  const [roomState, setRoomState] = useState('');

  const enterGame = event => {
    event.preventDefault();
    console.log(roomState);
    setState('PREPARE_GAME');
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

export function Home({ state, setState }) {
  return (
    <div className="home">
      <button onClick={() => setState("WAITING_FOR_SECOND_PLAYER")} className="btn box">Új játék</button>
      <ConnectRoomModal state={state} setState={setState}/>
    </div>
  )
}