import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag, generateItems } from '../plugins/utils';

class DragDelay extends Component {
  constructor() {
    super();
    this.state = {
      items: generateItems(50, (index) => {
        return {
          id: index,
          data: 'Draggable' + index,
        };
      }),
    };
  }
  render() {
    return (
      <div>
        <div className="simple-page">
          {/* https://github.com/kutlugsahin/smooth-dnd#options */}
          <Container dragBeginDelay={200} dragClass="opacity-ghost" dropClass="opacity-ghost-drop" onDrop={(e) => this.setState({ items: applyDrag(this.state.items, e) })}>
            {this.state.items.map((p) => {
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
}

export default DragDelay;
