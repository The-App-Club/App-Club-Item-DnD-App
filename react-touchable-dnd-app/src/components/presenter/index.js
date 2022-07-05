import styled from '@emotion/styled';

const StyledPresenter = styled.div`
  border: 1px dashed gray;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  background-color: white;
  cursor: move;
`;

const SampleDragLayerPresenter = ({ text, x, y }) => {
  return (
    <div
      style={{
        width: 400,
        zIndex: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        transform: `translate(${x}px, ${y}px)`,
        pointerEvents: 'none',
      }}
    >
      <StyledPresenter style={{ zIndex: 10 }}>{text}</StyledPresenter>
    </div>
  );
};

export { SampleDragLayerPresenter };
