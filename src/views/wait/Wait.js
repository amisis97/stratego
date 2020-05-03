import React from 'react';
import './Wait.css';

export function Wait() {

    const room_number = "#123456";

    return (
        <div className="box">
            <h1>Waiting for second player</h1>
            <h2>Szoba azonosítója: <span className="room-number">{room_number}</span>
            </h2>
        </div>
    )
}