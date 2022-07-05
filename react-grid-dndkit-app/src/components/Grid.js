import {wrapGrid} from 'animate-css-grid';
import {useEffect, useRef} from 'react';
import {css} from '@emotion/css';
import {useMedia} from '../hooks/useMedia';

const Grid = ({children}) => {
  const gridDomRef = useRef(null);
  const columns = useMedia({
    queries: [
      '(min-width: 1500px)',
      '(min-width: 1000px)',
      '(min-width: 600px)',
      '(min-width: 300px)',
    ],
    values: [3, 3, 2, 2],
    // values: [5, 4, 3, 2],
    defaultValue: 1,
  });

  useEffect(() => {
    wrapGrid(gridDomRef.current, {
      // int: default is 0 ms
      stagger: 100,
      // int: default is 250 ms
      duration: 500,
      // string: default is 'easeInOut'
      easing: 'backInOut',
      // function: called with list of elements about to animate
      onStart: (animatingElementList) => {},
      // function: called with list of elements that just finished animating
      // cancelled animations will not trigger onEnd
      onEnd: (animatingElementList) => {},
    });
  }, []);
  return (
    <div
      ref={gridDomRef}
      className={css`
        display: grid;
        grid-template-columns: repeat(${columns}, 1fr);
        grid-gap: 1rem;
        padding: 3rem;
        max-width: 600px;
        margin: 0 auto;
      `}
    >
      {children}
    </div>
  );
};

export {Grid};
