import { useState } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag, generateItems } from '../plugins/utils';

import useForceUpdate from 'use-force-update';

function DropZone() {
  const forceUpdate = useForceUpdate();

  const [zones, setZones] = useState([1, 0, 0, 0]);

  const [classes, setClasses] = useState(['', '', '', '']);

  function onDrop(containerIndex, dropresult) {
    const { addedIndex, removedIndex, payload } = dropresult;
    if (addedIndex !== null || removedIndex !== null) {
      const newZones = [...zones] || [];

      if (removedIndex !== null) {
        newZones[containerIndex] = 0;
      }

      if (addedIndex !== null) {
        newZones[containerIndex] = 1;
      }

      setZones(newZones);
    }
    const newClasses = [...classes] || [];
    newClasses[containerIndex] = '';
    setClasses(newClasses);

    forceUpdate();
  }

  function dragEnter(i) {
    const newClasses = [...classes] || [];
    newClasses[i] = 'hover';
    setClasses(newClasses);
    forceUpdate();
  }

  function dragLeave(i) {
    const newClasses = [...classes] || [];
    newClasses[i] = '';
    setClasses(newClasses);
    forceUpdate();
  }

  return (
    <div className="drop-zone">
      {zones.map((p, i) => {
        return (
          <div key={i} className={`drop-zone-container ${classes[i]}`}>
            <Container style={{ height: '100%' }} groupName="1" behaviour="drop-zone" onDrop={(e) => onDrop(i, e)} onDragEnter={() => dragEnter(i)} onDragLeave={() => dragLeave(i)}>
              {p ? (
                <Draggable>
                  <div className="drop-zone-draggable">Draggable</div>
                </Draggable>
              ) : null}
            </Container>
          </div>
        );
      })}
    </div>
  );
}

export default DropZone;
