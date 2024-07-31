import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
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
  const [isLargeView, setIsLargeView] = useState(true);
  const isTransitioning = useRef(false);

  useEffect(() => {
    gsap.set('.small-elements__card', { opacity: 0, visibility: 'hidden' });
  }, []);

  const returnXYS_difference = (el1, el2) => {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();
    const xDif = rect2.left - rect1.left;
    const yDif = rect2.top - rect1.top;
    const scaleRatio = rect2.width / rect1.width;
    return { xDif, yDif, scaleRatio };
  };

  const onCompleteSmall = (largeElements, smallElements) => {
    gsap.set(smallElements, {
      opacity: 0,
      scale: 1,
      x: 0,
      y: 0,
      visibility: 'hidden',
    });
    gsap.set(largeElements, {
      opacity: 1,
      visibility: 'visible',
    });
    isTransitioning.current = false;
    setIsLargeView(true);
  };

  const onCompleteLarge = (largeElements, smallElements) => {
    gsap.set(largeElements, {
      opacity: 0,
      scale: 1,
      x: 0,
      y: 0,
      visibility: 'hidden',
    });
    gsap.set(smallElements, {
      opacity: 1,
      visibility: 'visible',
    });
    isTransitioning.current = false;
    setIsLargeView(false);
  };

  const createSmallAnimation = () => {
    if (isTransitioning.current || isLargeView) return;
    isTransitioning.current = true;

    const largeElements = document.querySelectorAll('.large-elements__card');
    const smallElements = document.querySelectorAll('.small-elements__card');
    const xDifs = [];
    const yDifs = [];
    const scaleDifs = [];

    smallElements.forEach((el1, index) => {
      const { xDif, yDif, scaleRatio } = returnXYS_difference(
        el1,
        largeElements[index]
      );
      xDifs.push(xDif);
      yDifs.push(yDif);
      scaleDifs.push(scaleRatio);
    });

    gsap.to('.small-elements__card', {
      duration: 0.5,
      scale: (index) => scaleDifs[index],
      y: (index) => yDifs[index],
      x: (index) => xDifs[index],
      ease: 'power1.in',
      stagger: {
        ease: 'power2.in',
        amount: 0.3,
      },
      onComplete: () => onCompleteSmall(largeElements, smallElements),
    });

    gsap.to('.small-elements', {
      background: 'rgba(255,255,255,0)',
      delay: 0.2,
    });
  };

  const createLargeAnimation = () => {
    if (isTransitioning.current || !isLargeView) return;
    isTransitioning.current = true;

    const largeElements = document.querySelectorAll('.large-elements__card');
    const smallElements = document.querySelectorAll('.small-elements__card');
    const xDifs = [];
    const yDifs = [];
    const scaleDifs = [];

    largeElements.forEach((el1, index) => {
      const { xDif, yDif, scaleRatio } = returnXYS_difference(
        el1,
        smallElements[index]
      );
      xDifs.push(xDif);
      yDifs.push(yDif);
      scaleDifs.push(scaleRatio);
    });

    gsap.to('.large-elements__card', {
      duration: 0.5,
      scale: (index) => scaleDifs[index],
      y: (index) => yDifs[index],
      x: (index) => xDifs[index],
      ease: 'power1.out',
      stagger: {
        ease: 'power2.out',
        amount: 0.3,
      },
      onComplete: () => onCompleteLarge(largeElements, smallElements),
    });

    gsap.to('.small-elements', {
      background: 'rgba(255,255,255,0.3)',
      delay: 0.7,
    });
  };

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
      <div className="large-elements" onClick={createLargeAnimation}>
        {returnElement(false)}
      </div>
      <div className="small-elements" onClick={createSmallAnimation}>
        {returnElement(true)}
      </div>
    </div>
  );
};

export default CardPanel;
