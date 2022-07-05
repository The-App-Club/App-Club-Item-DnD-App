import { useState } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag, generateItems } from '../plugins/utils';

const groupStyle = {
  margin: '50px',
  overflowX: 'auto',
};

function SimpleHorizontal() {
  const [items, setItems] = useState(generateItems(15, (i) => ({ id: '2' + i, data: `Draggable - ${i}` })));

  function handleDrop(e) {
    const newItems = [...items] || [];

    setItems(applyDrag(newItems, e));
  }

  return (
    <div>
      <div style={groupStyle}>
        <Container orientation="horizontal" onDrop={(e) => handleDrop(e)}>
          {items.map((p) => {
            return (
              <Draggable key={p.id}>
                <div className="draggable-item-horizontal">{p.data}</div>
              </Draggable>
            );
          })}
        </Container>
      </div>
    </div>
  );
}

export default SimpleHorizontal;
