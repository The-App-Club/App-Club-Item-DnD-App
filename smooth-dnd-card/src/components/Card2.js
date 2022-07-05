import { useState } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag, generateItems } from '../plugins/utils';

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

const columnNames = ['Lorem', 'Ipsum', 'Consectetur', 'Eiusmod'];

const cardColors = ['azure', 'beige', 'bisque', 'blanchedalmond', 'burlywood', 'cornsilk', 'gainsboro', 'ghostwhite', 'ivory', 'khaki'];
const pickColor = () => {
  let rand = Math.floor(Math.random() * 10);
  return cardColors[rand];
};

function Card() {
  const [scene, setScene] = useState({
    type: 'container',
    props: {
      orientation: 'horizontal',
    },
    children: generateItems(4, (i) => ({
      id: `column${i}`,
      type: 'container',
      name: columnNames[i],
      props: {
        orientation: 'vertical',
        className: 'card-container',
      },
      children: generateItems(+(Math.random() * 10).toFixed() + 5, (j) => ({
        type: 'draggable',
        id: `${i}${j}`,
        props: {
          className: 'card',
          style: { backgroundColor: pickColor() },
        },
        data: lorem.slice(0, Math.floor(Math.random() * 150) + 30),
      })),
    })),
  });

  function getCardPayload(columnId, index) {
    return scene.children.filter((p) => p.id === columnId)[0].children[index];
  }

  function onColumnDrop(dropResult) {
    const newScene = Object.assign({}, scene);
    newScene.children = applyDrag(newScene.children, dropResult);
    setScene(newScene);
  }

  function onCardDrop(columnId, dropResult) {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const newScene = Object.assign({}, scene);
      const column = newScene.children.filter((p) => p.id === columnId)[0];
      const columnIndex = newScene.children.indexOf(column);
      const newColumn = Object.assign({}, column);
      newColumn.children = applyDrag(newColumn.children, dropResult);
      newScene.children.splice(columnIndex, 1, newColumn);
      setScene(newScene);
    }
  }

  return (
    <div className="card-scene">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'cards-drop-preview',
        }}
      >
        {scene.children.map((column) => {
          return (
            <Draggable key={column.id}>
              <div className={column.props.className}>
                <div className="card-column-header">
                  <span className="column-drag-handle">&#x2630;</span>
                  {column.name}
                </div>
                <Container
                  {...column.props}
                  groupName="col"
                  onDragStart={(e) => console.log('drag started', e)}
                  onDragEnd={(e) => console.log('drag end', e)}
                  onDrop={(e) => onCardDrop(column.id, e)}
                  getChildPayload={(index) => getCardPayload(column.id, index)}
                  dragClass="card-ghost"
                  dropClass="card-ghost-drop"
                  onDragEnter={() => {
                    console.log('drag enter:', column.id);
                  }}
                  onDragLeave={() => {
                    console.log('drag leave:', column.id);
                  }}
                  onDropReady={(p) => console.log('Drop ready: ', p)}
                  dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'drop-preview',
                  }}
                  dropPlaceholderAnimationDuration={200}
                >
                  {column.children.map((card) => {
                    return (
                      <Draggable key={card.id}>
                        <div {...card.props}>
                          <p>{card.data}</p>
                        </div>
                      </Draggable>
                    );
                  })}
                </Container>
              </div>
            </Draggable>
          );
        })}
      </Container>
    </div>
  );
}

export default Card;
