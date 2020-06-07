import React from 'react';
import './Wait.css';
import { Loader, Button, Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { setView } from '../../state/view/actions';
import { getRoomId } from '../../state/room/selectors';

export function Wait() {

    const dispatch = useDispatch();
    const roomId = useSelector(getRoomId);

    return (
        <div className="box">
            <h1>Waiting for second player</h1>
            <div className="wait-text">Szoba azonosítója: <span className="room-number">{roomId}</span>
            <Loader className="wait-load" active inline />
            </div>
            <Button onClick={() => dispatch(setView("MAIN_PAGE"))} icon labelPosition='left'>Vissza<Icon name='left arrow' /></Button>
        </div>
    )
}