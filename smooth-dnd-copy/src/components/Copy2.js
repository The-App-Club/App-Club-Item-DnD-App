import { useState } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag, generateItems } from '../plugins/utils';

const groupStyle = {
  marginLeft: '50px',
  flex: 1,
};

function Copy() {
  const [items1, setItems1] = useState(generateItems(15, (i) => ({ id: '1' + i, data: `Source Draggable - ${i}` })));
  const [items2, setItems2] = useState(generateItems(15, (i) => ({ id: '2' + i, data: `Draggable 2 - ${i}` })));
  const [items3, setItems3] = useState(generateItems(15, (i) => ({ id: '3' + i, data: `Draggable 3 - ${i}` })));

  function handleDropItems1(e) {
    const newItems1 = [...items1] || [];
    setItems1(applyDrag(newItems1, e));
  }

  function handleDropItems2(e) {
    const newItems2 = [...items2] || [];
    setItems2(applyDrag(newItems2, e));
    console.log('items2', items2);
  }

  function handleDropItems3(e) {
    const newItems3 = [...items3] || [];
    setItems3(applyDrag(newItems3, e));
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'stretch', marginTop: '50px', marginRight: '50px' }}>
      <div style={groupStyle}>
        <Container groupName="1" behaviour="copy" getChildPayload={(i) => items1[i]} onDrop={(e) => handleDropItems1(e)}>
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
        <Container groupName="1" getChildPayload={(i) => items2[i]} onDrop={(e) => handleDropItems2(e)}>
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
        <Container groupName="1" getChildPayload={(i) => items3[i]} onDrop={(e) => handleDropItems3(e)}>
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
  );
}

export default Copy;
