import React, { useState } from 'react';
import './App.css';
import { Home } from './views/home/Home';
import { Layout } from './views/layout/Layout';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Leiras } from './views/static/Leiras';
import { Wait } from './views/wait/Wait';
import { Prepare } from './views/prepare/Prepare';
import { Game } from './views/game/Game';

function App() {
  const [state, setState] = useState('MAIN_PAGE'); // teszt miatt

  console.log(state);

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/">
            {state === 'MAIN_PAGE' &&
            <Home state={state} setState={setState}/>}
            {state === 'WAITING_FOR_SECOND_PLAYER' &&
            <Wait state={state} setState={setState}/>}
            {state === 'PREPARE_GAME' &&
            <Prepare state={state} setState={setState}/>}
            {state === 'IN_GAME' &&
            <Game state={state} setState={setState}/>}
          </Route>
          <Route path="/leiras">
            <Leiras />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default App;
