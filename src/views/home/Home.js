import React, { useState, useEffect } from 'react';
import './Home.css';

export function Home({state, setState}) {
    return (
        <div className="home">
            <div className="box">
                <button onClick={() => setState("WAITING_FOR_SECOND_PLAYER")} className="btn">Új játék</button>
            </div>
        </div>
    )
}