import React from 'react';
import './Static.css';
import { Button, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export function Leiras() {
    return (
        <div className="box">
            <div className="static-content">
                <h1>Játék leírása</h1>
                <p>A játékban két játékos játszik egymással egy-egy hadsereg élén. Cél az ellenfél zászlójának megszerzése. A tábla 10x10 cellából áll. Eredetileg mindkét félnek 40 bábuja van: 1 zászló, 5 bomba, és katonák 1-től 10-es erővel. Egymás bábuit azonban nem látják, csak akkor, amikor két bábu csatázni kezd. Ekkor az erősebb bábu marad a pályán, a gyengébbik leesik a tábláról. Ha két azonos bábu harcol egymással, akkor mindkettő lekerül a tábláról. Minden bábu csak 1-et léphet előre, hátra, jobbra, balra. a zászló és az akna értelemszerűen nem tud lépni. A táblán lehetnek olyan mezők, amelyre nem lehet lépni (tó). Van pár speciális figura:</p>
                <ul>
                    <li>a 2-es a felderítő, ő akárhány mezőt átugorva léphet vagy támadhat. Tavat ő sem tudja átugrani.</li>
                    <li>a 3-as az aknász. Csak ő tudja hatástalanítani a bombát</li>
                    <li>az 1-es a kém, ha ő támadja meg az ellenfél 10-esét, akkor megöli.</li>
                    <li>bomba: aki rálép, az felrobban, a bomba viszont megmarad. Csak az aknász képes leszedni a tábláról.</li>
                </ul>
                <NavLink exact to="/"><Button icon labelPosition='left'>Vissza a játékhoz<Icon name='left arrow' /></Button></NavLink>
            </div>
        </div>
    )
}