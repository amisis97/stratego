import React, { useEffect } from 'react';
import './App.css';
import { Home } from './views/home/Home';
import { Layout } from './views/layout/Layout';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Leiras } from './views/static/Leiras';
import { Wait } from './views/wait/Wait';
import { Prepare } from './views/prepare/Prepare';
import { Game } from './views/game/Game';
import { getView } from './state/view/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { wsConnect } from './state/prepare/actions';
import { socketApi } from './api/socket';

function App() {
  const state = useSelector(getView);
  const dispatch = useDispatch();

  useEffect(() => {
    socketApi.connect();
  });

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/">
            {state === 'MAIN_PAGE' &&
            <Home/>}
            {state === 'WAITING_FOR_SECOND_PLAYER' &&
            <Wait/>}
            {state === 'PREPARE_GAME' &&
            <Prepare/>}
            {state === 'IN_GAME' &&
            <Game/>}
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
