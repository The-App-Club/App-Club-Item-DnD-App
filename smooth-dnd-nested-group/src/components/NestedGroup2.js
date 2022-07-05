import { useState } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag, generateItems } from '../plugins/utils';

const itemsData = generateItems(30, (i) => ({
  id: 'item1 ' + i,
  type: 'draggable',
  data: `Container 1 Draggable - ${i}`,
}));

const items2 = generateItems(10, (i) => ({
  id: 'item2 ' + i,
  type: 'draggable',
  data: `Container 2 Draggable - ${i}`,
}));

items2[3] = {
  ...items2[3],
  type: 'container',
  items: generateItems(4, (i) => ({
    id: 'item2 sub' + i,
    type: 'draggable',
    data: `Container 4 Draggable - ${i}`,
  })),
};

const items3 = generateItems(4, (i) => ({
  id: 'item3 ' + i,
  type: 'draggable',
  data: `Container 3 Draggable - ${i}`,
}));

itemsData[5] = {
  ...itemsData[5],
  type: 'container',
  items: items2,
};

itemsData[9] = {
  ...itemsData[9],
  type: 'container',
  items: items3,
};

function NestedGroup() {
  const [items, setItems] = useState(itemsData);

  function containerOnDrop(e) {
    console.log('level 1: Drop');
    const newItems = [...items] || [];
    setItems(applyDrag(newItems, e));
  }

  function containerOnDrop2(id, e) {
    console.log('level 2: Drop');
    const newItems = [...items] || [];
    newItems[id].items = applyDrag(newItems[id].items, e);
    setItems(newItems);
  }

  function containerOnDrop3(id1, id2, e) {
    console.log('level 3: Drop');
    const newItems = [...items] || [];
    newItems[id1].items[id2].items = applyDrag(newItems[id1].items[id2].items, e);
    setItems(newItems);
  }

  return (
    <div>
      <div className="simple-page">
        <Container groupName="1" onDrop={containerOnDrop} getChildPayload={(i) => items[i]}>
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
                    <h4 style={{ textAlign: 'center' }}>NestedGroup Sortable List - {p.id}</h4>
                    <div style={{ cursor: 'default' }}>
                      <Container groupName="1" getChildPayload={(index) => items[i].items[index]} onDrop={(e) => containerOnDrop2(i, e)}>
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
                                    NestedGroup Sortable List - {q.id}
                                  </h4>
                                  <div style={{ cursor: 'default' }}>
                                    <Container getChildPayload={(index) => items[i].items[j].items[index]} groupName="1" onDrop={(e) => containerOnDrop3(i, j, e)}>
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

export default NestedGroup;
