import React from 'react';
import './Prepare.css';
import { Popup, Icon, Button } from 'semantic-ui-react';
import cn from 'classnames';

export const boardSize = 10;
export const gridStyle = {gridTemplateColumns: `repeat(${boardSize}, ${100 / boardSize}%)`, gridTemplateRows: `repeat(${boardSize}, ${100 / boardSize}%)`};

export class Figure {
    constructor(name, count, num) {
        this.name = name;
        this.count = count;
        this.num = num;
        this.col = 0;
        this.row = 0;
    }

    display() {
        if(this.num === -1) { //zaszlo
            return (<Icon name='flag' />);
        } 
        if(this.num === 0) { //bomba
            return (<Icon name='bomb' />);
        }
        return (<span>{this.num}</span>);
    }
}

const availableFigures = [];
availableFigures.push(new Figure('Zászló', 1, -1));
availableFigures.push(new Figure('Tábornagy', 1, 10));
availableFigures.push(new Figure('Tábornok', 1, 9));
availableFigures.push(new Figure('Ezredes', 2, 8));
availableFigures.push(new Figure('Őrnagy', 3, 7));
availableFigures.push(new Figure('Kapitány', 4, 6));
availableFigures.push(new Figure('Főhadnagy', 4, 5));
availableFigures.push(new Figure('Őrmester', 4, 4));
availableFigures.push(new Figure('Aknász', 5, 3));
availableFigures.push(new Figure('Felderítő', 8, 2));
availableFigures.push(new Figure('Kém', 1, 1));
availableFigures.push(new Figure('Bomba', 6, 0));

const FigureGrid = ({figure}) => {
    return (
        <div className="figure-grid">
            <Popup content={figure.name} trigger={figure.display()} />
            <div className="count">{figure.count}x</div>
        </div>
    )
}

const BoardCell = ({row, col}) => {
    return (
        <div row={row} className={cn("board-cell", {unavailable: row < 6})}>

        </div>
    )
}


export function Prepare({ state, setState }) {

    const boardCells = [];

    for(let i = 0; i < boardSize; i++) {
        for(let j = 0; j < boardSize; j++) {
            boardCells.push(<BoardCell key={i + '-' + j} row={i} col={j}></BoardCell>);
        }
    }



    return (
        <div className="prepare box scroll">
            <h1>Játék előkészítése</h1>
            <h3><Button onClick={() => setState("MAIN_PAGE")} icon labelPosition='left'>Kilépés a játékból<Icon name='left arrow' /></Button>Helyezd fel a táblára a bábukat, utána nyomj a KÉSZ gombra</h3>
            <button onClick={() => setState("IN_GAME")} className="btn ready">Kész</button>
            <div className="figures-set">
                {availableFigures.map(figure =>
                <FigureGrid key={figure.num} figure={figure}></FigureGrid>
                )}
            </div>
            <div style={gridStyle} className="board">
                {boardCells}
            </div>
        </div>
    )
}