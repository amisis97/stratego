import React from 'react';
import './Prepare.css';
import { Popup, Icon, Button } from 'semantic-ui-react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { setView } from '../../state/view/actions';
import { getAvailableFigures, getSetFigures, getGrabFigure } from '../../state/prepare/selectors';
import { grabFigure, setFigure, deleteFigure } from '../../state/prepare/actions';
import { setPlayerField } from '../../state/game/actions'; 
import { Figure } from '../../types/Figure';
import { socketApi } from '../../api/socket';
import { getRoomId } from '../../state/room/selectors';
import { getGame, getPlayerId, getFirstPlayerFigures, getSecondPLayerFigures } from '../../state/game/selectors';


export const boardSize = 6;
export const gridStyle = {gridTemplateColumns: `repeat(${boardSize}, ${100 / boardSize}%)`, gridTemplateRows: `repeat(${boardSize}, ${100 / boardSize}%)`};

const FigureGrid = ({figure}) => {
    const dispatch = useDispatch();
    const grabbedFigure = useSelector(getGrabFigure);

    const selectFigure = e => {
        dispatch(grabFigure(figure));
    } 

    return (
        <div className={cn("figure-grid", {selected: grabbedFigure && grabbedFigure === figure})} onClick={(e) => selectFigure(e)}>
            <Popup content={figure.name} trigger={figure.display()} />
            <div className={cn("count")}>{figure.count}x</div>
        </div>
    )
}

const BoardCell = ({playerId, figure, row, col}) => {

    const dispatch = useDispatch();

    const clickHandle = (e) => {
        if(!e.target.classList.contains('set')) {
            dispatch(setFigure({row: row, col: col}));
        } else {
            dispatch(deleteFigure({row: row, col: col}));
        }
    } 

    const fig = figure ? new Figure(figure.name, 1, figure.num) : null;
    const unavailable = playerId === 1 ? row < 4 : row > 1;

    return (
        <div onClick={(e) => clickHandle(e)} row={row} className={cn("board-cell", {unavailable: unavailable}, {set: fig})}>
            {fig ? fig.display() : null}
        </div>
    )
}


export function Prepare() {

    const dispatch = useDispatch();
    const boardCells = useSelector(getSetFigures);
    const availableFigures = useSelector(getAvailableFigures);
    const firstPlayerFigures = useSelector(getFirstPlayerFigures);
    const secondPlayerFigures = useSelector(getSecondPLayerFigures);
    const roomId = useSelector(getRoomId);
    const tempBoardCells = [];
    const game = useSelector(getGame);
    const playerId = useSelector(getPlayerId);

    

    for(let i = 0; i < boardSize; i++) {
        for(let j = 0; j < boardSize; j++) {
            if(typeof(tempBoardCells[i]) === 'undefined') {
                tempBoardCells[i] = [];
            }
            const setted = boardCells.find(b => b.row === i &&  b.col === j);
            tempBoardCells[i][j] = <BoardCell playerId={playerId} figure={setted} key={i + '-' + j} row={i} col={j}></BoardCell>;
        }
    }

    const handleContinue = (e) => {
        console.log(playerId);
        dispatch(setPlayerField({
            playerId: playerId, 
            figures: boardCells
        }));
        if(playerId === 1) {
            socketApi.savePrepare(roomId, {...game, firstPlayerFigures: boardCells}, dispatch);
        } else {
            socketApi.savePrepare(roomId, {...game, secondPlayerFigures: boardCells}, dispatch);
        }
    }

    return (
        <div className="prepare box scroll">
            <h1>Játék előkészítése</h1>
            <h3><Button onClick={() => socketApi.leaveRoom(roomId, dispatch)} icon labelPosition='left'>Kilépés a játékból<Icon name='left arrow' /></Button>Helyezd fel a táblára a bábukat, utána nyomj a KÉSZ gombra</h3>
            <button disabled={availableFigures.length > 0} onClick={(e) => handleContinue(e)} className={cn("btn ready")}>Kész</button>
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