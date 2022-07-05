import { useState } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag, generateItems } from '../plugins/utils';

function DragDelay() {
  const [items, setItems] = useState(
    generateItems(50, (index) => {
      return {
        id: index,
        data: 'Draggable' + index,
      };
    })
  );

  function handleDrop(e) {
    const newItems = [...items] || [];
    setItems(applyDrag(newItems, e));
  }

  return (
    <div>
      <div className="simple-page">
        {/* https://github.com/kutlugsahin/smooth-dnd#options */}
        <Container dragBeginDelay={200} dragClass="opacity-ghost" dropClass="opacity-ghost-drop" onDrop={(e) => handleDrop(e)}>
          {items.map((p) => {
            return (
              <Draggable key={p.id}>
                <div className="draggable-item">{p.data}</div>
              </Draggable>
            );
          })}
        </Container>
      </div>
    </div>
  );
}

export default DragDelay;
