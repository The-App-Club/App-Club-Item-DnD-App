import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import {Photo} from './Photo';

const SortablePhoto = (props) => {
  const sortable = useSortable({id: props.url});
  const {
    attributes,
    listeners,
    // eslint-disable-next-line
    isDragging,
    setNodeRef,
    transform,
    transition,
  } = sortable;

  // console.log(transform, CSS.Transform.toString(transform));
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Photo
      ref={setNodeRef}
      style={style}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

export {SortablePhoto};
