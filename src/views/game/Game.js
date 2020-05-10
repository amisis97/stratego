import React from 'react';
import './Game.css';
import { Icon } from 'semantic-ui-react';
import { boardSize, gridStyle } from '../prepare/Prepare';
import cn from 'classnames';

export function Game() {

    const display = (num) => {
        if(num === -1) { //zaszlo
            return (<Icon name='flag' />);
        } 
        if(num === 0) { //bomba
            return (<Icon name='bomb' />);
        }
        return (<span>{num}</span>);
    }

    const BoardCell = ({num, row, col}) => {
        console.log(num)
        return (
            <div row={row} className={cn("board-cell", {active: typeof(num) !== "undefined"})}>
                {display(num)}
            </div>
        )
    }

    //Ezek az adatok jonnek majd ha beallitjak a jatektablat
    const firstPlayer = {
        'board': [
            {name: 'Zászló', num: -1, row: 0, col: 0},
            {name: 'Tábornagy', num: 10, row: 0, col: 1},
            {name: 'Bomba', num: 0, row: 0, col: 2},
            {name: 'Bomba', num: 0, row: 1, col: 0},
        ]
    }

    const secondPlayer = {
        'board': [
            {name: 'Zászló', num: -1, row: 0, col: 0},
            {name: 'Tábornagy', num: 10, row: 0, col: 1},
            {name: 'Bomba', num: 0, row: 0, col: 2},
            {name: 'Bomba', num: 0, row: 1, col: 0},
        ]
    }

    //Feltolti ures mezokkel a jatekot
    const boardCells = [];
    for(let i = 0; i < boardSize; i++) {
        for(let j = 0; j < boardSize; j++) {
            if(!boardCells[i]) {
                boardCells[i] = [];
            }
            boardCells[i][j] = <BoardCell key={i + '-' + j} row={i} col={j}></BoardCell>;
        }
    }
    //Feltoltjuk a jatekosok babujinak koordinatait
    firstPlayer.board.forEach(figure => {
        if(!boardCells[figure.row]) {
            boardCells[figure.row] = [];
        }
        boardCells[figure.row][figure.col] = <BoardCell key={figure.row + '-' + figure.col} num={figure.num} row={figure.row} col={figure.col}></BoardCell>;
    });
    console.log(boardCells);
    return (
        <div className="scroll box game">
            <h1>Játék</h1>
            <h3>2. játékos következik...</h3>
            <div className="boards">
                <div className="first-player figures">
                    <h4>1. játékos</h4>
                    <div className="lost-figures">

                    </div>
                </div>
                <div style={gridStyle} className="board">
                    {boardCells}
                </div>
                <div className="second-player figures">
                    <h4>2. játékos</h4>
                    <div className="lost-figures">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}