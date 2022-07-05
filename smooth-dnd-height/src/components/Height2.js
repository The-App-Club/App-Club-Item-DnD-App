import { useState } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag, generateItems } from '../plugins/utils';

function Height() {
  const [items, setItems] = useState(
    generateItems(50, (index) => {
      return {
        id: index,
        data: 'Draggable' + index,
        height: `${(40 + Math.random() * 200).toFixed()}px`,
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
        <Container onDrop={(e) => handleDrop(e)}>
          {items.map((p) => {
            return (
              <Draggable key={p.id}>
                <div className="draggable-item" style={{ height: p.height }}>
                  {p.data}
                </div>
              </Draggable>
            );
          })}
        </Container>
      </div>
    </div>
  );
}

export default Height;
