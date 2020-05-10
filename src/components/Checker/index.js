import React from 'react';
import PropType from 'prop-types';
import './style.css';

const Checker = ({ className, ...props }) => {
  let resultClassName = 'checker';

  if (className) {
    resultClassName = `${resultClassName} ${className}`;
  }

  return <div className={resultClassName} {...props} />;
};

Checker.propTypes = {
  className: PropType.string,
};

export default Checker;
