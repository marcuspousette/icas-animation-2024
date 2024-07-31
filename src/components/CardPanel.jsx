import React, { useState, useRef } from 'react';
import './CardPanel.css';

const ELEMENTS = [
  { name: '0' },
  { name: '1' },
  { name: '2' },
  { name: '3' },
  { name: '4' },
  { name: '5' },
  { name: '6' },
  { name: '7' },
  { name: '8' },
  { name: '9' },
];

const CardPanel = () => {
  const returnElement = (isSmall) => {
    return ELEMENTS.map((element) => {
      return (
        <div
          className={isSmall ? 'small-elements__card' : 'large-elements__card'}
          key={element.name}
        ></div>
      );
    });
  };

  return (
    <div className="card-panel">
      <div className="large-elements">{returnElement(false)}</div>
    </div>
  );
};

export default CardPanel;
