import { useState } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag, generateItems } from '../plugins/utils';

const itemsData = generateItems(30, (i) => ({
  id: i,
  type: 'draggable',
  data: `Container 1 Draggable - ${i}`,
}));

const items2 = generateItems(10, (i) => ({
  id: i,
  type: 'draggable',
  data: `Container 2 Draggable - ${i}`,
}));

items2[3] = {
  id: 3,
  type: 'container',
  items: generateItems(4, (i) => ({
    id: i,
    type: 'draggable',
    data: `Container 4 Draggable - ${i}`,
  })),
};

const items3 = generateItems(4, (i) => ({
  id: i,
  type: 'draggable',
  data: `Container 3 Draggable - ${i}`,
}));

itemsData[5] = {
  id: 5,
  type: 'container',
  items: items2,
};

itemsData[9] = {
  id: 9,
  type: 'container',
  items: items3,
};

function Nested() {
  const [items, setItems] = useState(itemsData);

  function containerOnDrop(e) {
    const newItems = [...items] || [];
    setItems(applyDrag(newItems, e));
  }

  function containerOnDrop2(id, e) {
    const newItems = [...items] || [];
    newItems[id].items = applyDrag(newItems[id].items, e);
    setItems(newItems);
  }

  function containerOnDrop3(id1, id2, e) {
    const newItems = [...items] || [];
    newItems[id1].items[id2].items = applyDrag(newItems[id1].items[id2].items, e);
    setItems(newItems);
  }

  return (
    <div>
      <div className="simple-page">
        <Container onDrop={containerOnDrop}>
          {items.map((p, i) => {
            if (p.type === 'draggable') {
              return (
                <Draggable key={i}>
                  <div className="draggable-item">{p.data}</div>
                </Draggable>
              );
            } else {
              return (
                <Draggable key={i}>
                  <div
                    style={{
                      padding: '20px 20px',
                      marginTop: '2px',
                      marginBottom: '2px',
                      border: '1px solid rgba(0,0,0,.125)',
                      backgroundColor: '#fff',
                      cursor: 'move',
                    }}
                  >
                    <h4 style={{ textAlign: 'center' }}>Nested Sortable List - {p.id}</h4>
                    <div style={{ cursor: 'default' }}>
                      <Container onDrop={(e) => containerOnDrop2(i, e)}>
                        {p.items.map((q, j) => {
                          if (q.type === 'draggable') {
                            return (
                              <Draggable key={j}>
                                <div className="draggable-item" style={{ backgroundColor: 'cornsilk' }}>
                                  {q.data}
                                </div>
                              </Draggable>
                            );
                          } else {
                            return (
                              <Draggable key={j}>
                                <div
                                  style={{
                                    padding: '20px 20px',
                                    marginTop: '2px',
                                    marginBottom: '2px',
                                    border: '1px solid rgba(0,0,0,.125)',
                                    backgroundColor: 'cornsilk',
                                    cursor: 'move',
                                  }}
                                >
                                  <h4
                                    style={{
                                      textAlign: 'center',
                                    }}
                                  >
                                    Nested Sortable List - {q.id}
                                  </h4>
                                  <div style={{ cursor: 'default' }}>
                                    <Container onDrop={(e) => containerOnDrop3(i, j, e)}>
                                      {q.items.map((t, y) => {
                                        return (
                                          <Draggable key={y}>
                                            <div
                                              className="draggable-item"
                                              style={{
                                                backgroundColor: 'ghostwhite',
                                              }}
                                            >
                                              {t.data}
                                            </div>
                                          </Draggable>
                                        );
                                      })}
                                    </Container>
                                  </div>
                                </div>
                              </Draggable>
                            );
                          }
                        })}
                      </Container>
                    </div>
                  </div>
                </Draggable>
              );
            }
          })}
        </Container>
      </div>
    </div>
  );
}

export default Nested;
