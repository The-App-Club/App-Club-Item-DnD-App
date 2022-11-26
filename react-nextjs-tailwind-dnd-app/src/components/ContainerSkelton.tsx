import {cx, css} from '@emotion/css';
import {FiPlus} from 'react-icons/fi';

const ContainerSkelton = () => {
  return (
    <div
      className={cx(
        `min-w-[12rem] max-w-[20rem] w-full min-h-[calc(100vh-1rem)] border-4 p-2 border-dotted`,
        `flex justify-center items-center`,
        css`
          @media (max-width: 768px) {
            max-width: 100%;
          }
        `
      )}
    >
      <FiPlus size={24} className={`hover:cursor-pointer`} />
      <p>Add Column</p>
    </div>
  );
};

export default ContainerSkelton;
