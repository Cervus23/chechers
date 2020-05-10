import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import { createMap } from '../../engine/mapRenderer';
import Checker from '../Checker';

const renderElement = (symbol) => {
  switch (symbol) {
    case '0':
      return <Checker className="white-checker" />;
    case 'x':
      return <Checker className="black-checker" />;
    case 'M':
      return <Checker className="king-checker" />;
    default:
      return null;
  }
};

const GameMap = ({ width, height }) => {
  const map = createMap({ width, height });

  return (
    <div className="map">
      {map.map((row, i) => (
        <div className="row" key={i}>
          {row.map((symbol, j) => (
            <div className="cell" key={j}>
              {renderElement(symbol)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default connect(state => ({ state }))(GameMap);
