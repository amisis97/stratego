import React from 'react';
import './Game.css';
import { Icon, Popup, Button } from 'semantic-ui-react';
import { boardSize, gridStyle } from '../prepare/Prepare';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { setView } from '../../state/view/actions';
import { getFirstPlayerFigures, getFirstPlayerLostFigures, getSecondPLayerFigures, getSecondPlayerLostFigures, getActivePlayer, getAvailableFields } from '../../state/game/selectors';
import { selectFigure, moveFigure } from '../../state/game/actions';

export function Game() {

    const dispatch = useDispatch();
    const firstPlayerFigures = useSelector(getFirstPlayerFigures);
    const secondPlayerFigures = useSelector(getSecondPLayerFigures);
    const firstPlayerLostFigures = useSelector(getFirstPlayerLostFigures);
    const secondPlayerLostFigures = useSelector(getSecondPlayerLostFigures);
    const availableFields = useSelector(getAvailableFields);
    const activePlayer = useSelector(getActivePlayer);

    const figureToCell = (figure, playerNum) => {
        return <BoardCell selected={figure.selected} playerNum={playerNum} name={figure.name} key={figure.row + '-' + figure.col} num={figure.num} row={figure.row} col={figure.col}></BoardCell>;
    }

    const fillBoard = (playerBoard, playerNum) => {
        playerBoard.forEach(figure => {
            if(!boardCells[figure.row]) {
                boardCells[figure.row] = [];
            }
            boardCells[figure.row][figure.col] = figureToCell(figure, playerNum);
        });
    }

    const fillLostDiv = (board) => {
        const temp = [];
        board.forEach(figure => {
            temp.push(figureToCell(figure));
        });
        return temp;
    }

    const display = (num) => {
        if(num === -1) { //zaszlo
            return (<Icon name='flag' />);
        } 
        if(num === 0) { //bomba
            return (<Icon name='bomb' />);
        }
        return (<span>{num}</span>);
    }

    const selectFigureEvent = (row, col) => {
        if(activePlayer === 0 && firstPlayerFigures.find(f => f.row === row && f.col === col)) {
            dispatch(selectFigure({row: row, col: col}));
        } else if(activePlayer === 1 && secondPlayerFigures.find(f => f.row === row && f.col === col)) {
            dispatch(selectFigure({row: row, col: col}));
        } else if(availableFields.find(f => f.row === row && f.col === col)) {
            dispatch(moveFigure({row: row, col: col}));
        }
    }

    const BoardCell = ({name, num, row, col, selected, playerNum}) => {
        return (
            <div onClick={() => selectFigureEvent(row, col)} playernum={playerNum} row={row} col={col} className={cn("board-cell", {active: typeof(num) !== "undefined"}, {first: playerNum === 0}, {second: playerNum === 1}, {selected : selected}, {available: availableFields.find(af => af.row === row && af.col === col)})}>
                <Popup content={name} trigger={activePlayer === playerNum ? display(num) : null} />
            </div>
        )
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
    fillBoard(firstPlayerFigures, 0);
    fillBoard(secondPlayerFigures, 1);
    return (
        <div className="scroll box game">
            <h1>Játék</h1>
            <Button onClick={() => dispatch(setView("MAIN_PAGE"))} icon labelPosition='left'>Kilépés a játékból<Icon name='left arrow' /></Button>
            <h3>{activePlayer + 1}. játékos következik...</h3>
            <div className="boards">
                <div className="first-player figures">
                    <h4>1. játékos (TE)</h4>
                    <div className="lost-figures">
                        {fillLostDiv(firstPlayerLostFigures)}
                    </div>
                </div>
                <div style={gridStyle} className="board">
                    {boardCells}
                </div>
                <div className="second-player figures">
                    <h4>2. játékos</h4>
                    <div className="lost-figures">
                        {fillLostDiv(secondPlayerLostFigures)}
                    </div>
                </div>
            </div>
        </div>
    );
}