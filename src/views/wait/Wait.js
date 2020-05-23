import React from 'react';
import './Wait.css';
import { Loader, Button, Icon } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { setView } from '../../state/view/actions';

export function Wait() {

    const dispatch = useDispatch();
    const room_number = "#123456";

    return (
        <div className="box">
            <h1>Waiting for second player</h1>
            <div className="wait-text">Szoba azonosítója: <span className="room-number">{room_number}</span>
            <Loader className="wait-load" active inline />
            </div>
            <Button onClick={() => dispatch(setView("MAIN_PAGE"))} icon labelPosition='left'>Vissza<Icon name='left arrow' /></Button>
        </div>
    )
}