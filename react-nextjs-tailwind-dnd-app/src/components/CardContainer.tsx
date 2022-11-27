import {cx, css} from '@emotion/css';
import {FiMoreVertical} from 'react-icons/fi';
import {FiPlus} from 'react-icons/fi';
import Card from './Card';
import Spacer from './Spacer';

const CardContainer = () => {
  return (
    <div
      className={cx(
        'min-w-[12rem] max-w-[20rem] w-full min-h-[calc(100vh-1rem)] border-2 p-2 bg-slate-100',
        css`
          @media (max-width: 768px) {
            max-width: 100%;
          }
        `
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-inter font-bold">Title</h3>
        <div className="flex items-center gap-2">
          <FiPlus size={24} className={'hover:cursor-pointer'} />
          <FiMoreVertical size={24} className={'hover:cursor-pointer'} />
        </div>
      </div>
      <Spacer />
      <div>
        <Card />
      </div>
    </div>
  );
};

export default CardContainer;
