import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag, generateItems } from '../plugins/utils';

class Simple extends Component {
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
          <Container onDrop={(e) => this.setState({ items: applyDrag(this.state.items, e) })}>
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

class SimpleScroller extends Component {
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
        <div className="simple-page-scroller">
          <Container onDrop={(e) => this.setState({ items: applyDrag(this.state.items, e) })}>
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

export { Simple, SimpleScroller };
