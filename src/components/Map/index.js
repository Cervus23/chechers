import React from 'react';
import './style.css';
import { createMap } from '../../engine/mapRenderer';

const Map = ({ width, height }) => {
  const map = createMap({ width, height });

  return (
    <div className="map">
      {map.map((row) => (
        <div className="row">
          {row.map((symbol) => (
            <div className="cell">{symbol}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Map;
