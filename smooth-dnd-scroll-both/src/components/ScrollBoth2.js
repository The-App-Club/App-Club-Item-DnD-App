import { useState } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag, generateItems } from '../plugins/utils';

const groupStyle = {
  marginLeft: '50px',
  flex: 1,
};

function ScrollBoth() {
  const [items1, setItems1] = useState(generateItems(45, (i) => ({ id: '1' + i, data: `Source Draggable - ${i}` })));
  const [items2, setItems2] = useState(generateItems(45, (i) => ({ id: '2' + i, data: `Draggable 2 - ${i}` })));
  const [items3, setItems3] = useState(generateItems(45, (i) => ({ id: '3' + i, data: `Draggable 2 - ${i}` })));
  const [items4, setItems4] = useState(generateItems(45, (i) => ({ id: '4' + i, data: `Draggable 2 - ${i}` })));

  function handleDrop(e, listName) {
    switch (listName) {
      case 'items1':
        const newItems1 = [...items1] || [];

        setItems1(applyDrag(newItems1, e));

        break;
      case 'items2':
        const newItems2 = [...items2] || [];

        setItems2(applyDrag(newItems2, e));

        break;

      case 'items3':
        const newItems3 = [...items3] || [];

        setItems3(applyDrag(newItems3, e));

        break;

      case 'items4':
        const newItems4 = [...items4] || [];

        setItems4(applyDrag(newItems4, e));

        break;

      default:
        break;
    }
  }

  return (
    <div style={{ height: '600px', width: '600px', overflow: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'stretch', marginTop: '50px', marginRight: '50px', height: '1000px', width: '1000px', overflow: 'auto' }}>
        <div style={groupStyle}>
          <Container groupName="1" behaviour="copy" getChildPayload={(i) => items1[i]} onDrop={(e) => handleDrop(e, 'items1')}>
            {items1.map((p, i) => {
              return (
                <Draggable key={i}>
                  <div className="draggable-item">{p.data}</div>
                </Draggable>
              );
            })}
          </Container>
        </div>
        <div style={groupStyle}>
          <Container groupName="1" getChildPayload={(i) => items2[i]} onDrop={(e) => handleDrop(e, 'items2')}>
            {items2.map((p, i) => {
              return (
                <Draggable key={i}>
                  <div className="draggable-item">{p.data}</div>
                </Draggable>
              );
            })}
          </Container>
        </div>
        <div style={groupStyle}>
          <Container groupName="1" getChildPayload={(i) => items3[i]} onDrop={(e) => handleDrop(e, 'items3')}>
            {items3.map((p) => {
              return (
                <Draggable key={p.id}>
                  <div className="draggable-item">{p.data}</div>
                </Draggable>
              );
            })}
          </Container>
        </div>
      </div>
    </div>
  );
}

export default ScrollBoth;
