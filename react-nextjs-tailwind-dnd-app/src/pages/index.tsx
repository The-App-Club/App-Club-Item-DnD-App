import Container from '@/components/Container';
import ContainerSkelton from '@/components/ContainerSkelton';
import Example from '@/components/example';
import {cx, css} from '@emotion/css';

export default function Home() {
  return <Example />;

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
      <Container />
      <Container />
      <Container />
      <ContainerSkelton />
    </div>
  );
}
