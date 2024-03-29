import CardContainer from '@/components/CardContainer';
import ContainerSkelton from '@/components/ContainerSkelton';
import Example from '@/components/example';
import {cx, css} from '@emotion/css';

export default function Home() {
  return (
    <div className="max-w-full w-full">
      <Example />
    </div>
  );
  return (
    <div className="max-w-[30rem] w-full mx-auto mt-4">
      <Example />
    </div>
  );

  return (
    <div
      className={cx(
        'px-6 py-2 flex items-center gap-2',
        css`
          @media (max-width: 768px) {
            flex-direction: column;
          }
        `
      )}
    >
      <CardContainer />
      <CardContainer />
      <CardContainer />
      <ContainerSkelton />
    </div>
  );
}
