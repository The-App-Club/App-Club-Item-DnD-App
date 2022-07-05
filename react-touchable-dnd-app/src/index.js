import { render } from 'react-dom';
import { CardContainer } from './components/card/CardContainer';
import { DndProvider } from 'react-dnd';
import { SampleDragLayer } from './components/layer';
import { TouchBackend } from 'react-dnd-touch-backend';

import './index.css';

const App = () => {
  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <CardContainer />
      <SampleDragLayer />
    </DndProvider>
  );
};

const rootElement = document.getElementById('root');
render(<App />, rootElement);
