import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './App.css';
import GameMap from './components/GameMap';

const store = createStore((state = {}) => state);
//changes right here

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <GameMap width={9} height={9} />
      </div>
    </Provider>
  );
}

export default App;
