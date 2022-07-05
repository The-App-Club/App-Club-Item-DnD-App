import { useState } from 'react';
import { Container, Draggable, constants } from 'react-smooth-dnd';
import { applyDrag, generateItems } from '../plugins/utils';

function DynamicContainers() {
  const [items1, setItems1] = useState(generateItems(45, (i) => ({ id: '1' + i, data: `Draggable 1 - ${i}` })));
  const [items2, setItems2] = useState(generateItems(45, (i) => ({ id: '2' + i, data: `Draggable 2 - ${i}` })));
  const [items3, setItems3] = useState(generateItems(45, (i) => ({ id: '3' + i, data: `Draggable 3 - ${i}` })));
  const [items4, setItems4] = useState(generateItems(45, (i) => ({ id: '4' + i, data: `Draggable 4 - ${i}` })));

  const [popup1Open, setPopup1Open] = useState(false);
  const [popup2Open, setPopup2Open] = useState(false);

  function handleDrop(e, listName, getList) {
    switch (listName) {
      case 'items1':
        setItems1(applyDrag(getList(), e));

        break;
      case 'items2':
        setItems2(applyDrag(getList(), e));
        break;

      case 'items3':
        setItems3(applyDrag(getList(), e));

        break;

      case 'items4':
        setItems4(applyDrag(getList(), e));

        break;

      default:
        break;
    }
  }

  function handleMouseEnter(popupName) {
    switch (popupName) {
      case 'popup1':
        setPopup1Open(true);

        break;
      case 'popup2':
        setPopup2Open(true);
        break;

      default:
        break;
    }
  }

  function handleMouseLeave(popupName) {
    switch (popupName) {
      case 'popup1':
        setPopup1Open(false);

        break;
      case 'popup2':
        setPopup2Open(false);
        break;

      default:
        break;
    }
  }

  function renderContainer(listName, getList, autoScroll = true) {
    return (
      <div className={`dynamic-container-holder`}>
        <Container autoScrollEnabled={autoScroll} getGhostParent={() => document.body} groupName="1" getChildPayload={(i) => getList()[i]} onDrop={(e) => handleDrop(e, listName, getList)}>
          {getList().map((p) => {
            return (
              <Draggable key={p.id}>
                <div className="draggable-item">{p.data}</div>
              </Draggable>
            );
          })}
        </Container>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'stretch', height: '100%' }}>
      <div className="dynamic-left-pane">{renderContainer('items1', () => items1)}</div>
      <div className="dynamic-right-pane">
        <div className="dynamic-menu-container">
          <div className="popup-container-button" onMouseEnter={() => handleMouseEnter('popup1')} onMouseLeave={() => handleMouseLeave('popup1')}>
            Make Container Visible
            <div className={`popup-container ${popup1Open ? 'open' : ''}  ${constants.preventAutoScrollClass}`}>{renderContainer('items2', () => items2)}</div>
          </div>
          <div className="popup-container-button" onMouseEnter={() => handleMouseEnter('popup2')} onMouseLeave={() => handleMouseLeave('popup2')}>
            Mount New Container
            {popup2Open ? <div className={`popup-container ${popup2Open ? 'open' : ''}`}>{renderContainer('items3', () => items3)}</div> : null}
          </div>
        </div>
        <div className="dynamic-right-content">{renderContainer('items4', () => items4)}</div>
      </div>
    </div>
  );
}

export default DynamicContainers;
