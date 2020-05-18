import React from 'react';
import PropType from 'prop-types';
import './style.css';

const Checker = ({ className, isActive, ...props }) => {
  let resultClassName = 'checker';

  if (className) {
    resultClassName = `${resultClassName} ${className}`;
  }

  if (isActive) {
    resultClassName = `${resultClassName} active`;
  }

  return <div className={resultClassName} {...props} />;
};

Checker.propTypes = {
  className: PropType.string.isRequired,
  isActive: PropType.bool.isRequired,
};

export default Checker;
