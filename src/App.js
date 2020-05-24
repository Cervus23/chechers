import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './App.css';
import GameMap from './components/GameMap';
import reducers from './store/reducers';

const store = createStore(reducers);

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <GameMap />
      </div>
    </Provider>
  );
};
