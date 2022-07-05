import {forwardRef} from 'react';
import {css} from '@emotion/css';

const _Photo = ({url, index, faded, style, ...props}, ref) => {
  return (
    <div
      ref={ref}
      style={style}
      className={css`
        opacity: ${faded ? 0.2 : 1};
        transform-origin: top left;
        height: ${index === 0 ? 310 : 120}px;
        grid-row-start: ${index === 0 ? 'span 2' : null};
        grid-column-start: ${index === 0 ? 'span 2' : null};
        background-image: url(${url});
        background-size: cover;
        background-position: center;
        background-color: hsl(220, 40%, 92%);
      `}
      {...props}
    ></div>
  );
};

const Photo = forwardRef(_Photo);

export {Photo};
