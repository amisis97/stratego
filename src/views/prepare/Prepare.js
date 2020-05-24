import React from 'react';
import './Prepare.css';
import { Popup, Icon, Button } from 'semantic-ui-react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { setView } from '../../state/view/actions';
import { getAvailableFigures, getGrabFigure, getSetFigures } from '../../state/prepare/selectors';
import { grabFigure, setFigure } from '../../state/prepare/actions';


export const boardSize = 6;
export const gridStyle = {gridTemplateColumns: `repeat(${boardSize}, ${100 / boardSize}%)`, gridTemplateRows: `repeat(${boardSize}, ${100 / boardSize}%)`};

const FigureGrid = ({figure}) => {
    const dispatch = useDispatch();
    
    const selectFigure = (figure) => {
        dispatch(grabFigure(figure));
    }

    return (
        <div onClick={() =>  selectFigure(figure)} className="figure-grid">
            <Popup content={figure.name} trigger={figure.display()} />
            <div className={cn("count")}>{figure.count}x</div>
        </div>
    )
}

const BoardCell = ({row, col}) => {

    const dispatch = useDispatch();

    const dropFigure = (row, col) => {
        dispatch(setFigure({row: row, col: col}));
    }

    return (
        <div onClick={() => dropFigure(row, col)} row={row} className={cn("board-cell", {unavailable: row < 4})}>
            
        </div>
    )
}


export function Prepare() {

    const dispatch = useDispatch();
    const boardCells = useSelector(getSetFigures);
    const availableFigures = useSelector(getAvailableFigures);
    const tempBoardCells = [];

    for(let i = 0; i < boardSize; i++) {
        for(let j = 0; j < boardSize; j++) {
            if(typeof(tempBoardCells[i]) === 'undefined') {
                tempBoardCells[i] = [];
            }
            const setted = boardCells.find(b => b.col === i &&  b.row === j);
            tempBoardCells[i][j] = <BoardCell figure={setted} key={i + '-' + j} row={i} col={j}></BoardCell>;
        }
    }

    return (
        <div className="prepare box scroll">
            <h1>Játék előkészítése</h1>
            <h3><Button onClick={() => dispatch(setView("MAIN_PAGE"))} icon labelPosition='left'>Kilépés a játékból<Icon name='left arrow' /></Button>Helyezd fel a táblára a bábukat, utána nyomj a KÉSZ gombra</h3>
            <button onClick={() => dispatch(setView('IN_GAME'))} className="btn ready">Kész</button>
            <div className="figures-set">
                {!availableFigures ? null : availableFigures.map(figure =>
                <FigureGrid key={figure.num} figure={figure}></FigureGrid>
                )}
            </div>
            <div style={gridStyle} className="board">
                {tempBoardCells}
            </div>
        </div>
    )
}