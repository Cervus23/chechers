import { BLACK_CHECKER, KING, WHITE_CHECKER } from '../../engine/types';
import Checker from '../Checker';
import React from 'react';

const CellElement = ({ symbol, isActive, ...props }) => {
  switch (symbol) {
    case WHITE_CHECKER:
      return <Checker className="white-checker" isActive={isActive} {...props} />;
    case BLACK_CHECKER:
      return <Checker className="black-checker" isActive={isActive} {...props} />;
    case KING:
      return <Checker className="king-checker" isActive={isActive} {...props} />;
    default:
      return null;
  }
};

export default CellElement;
