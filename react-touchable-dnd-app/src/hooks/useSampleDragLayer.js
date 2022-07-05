import { useDragLayer } from 'react-dnd';

export const useSampleDragLayer = () => {
  const { item, isDragging, initialOffset, differenceOffset } = useDragLayer(
    (monitor) => ({
      initialOffset: monitor.getInitialSourceClientOffset(),
      differenceOffset: monitor.getDifferenceFromInitialOffset(),
      item: monitor.getItem(),
      isDragging: monitor.isDragging(),
    })
  );

  if (!isDragging || !differenceOffset || !initialOffset) {
    return { text: '', isDragging: isDragging, x: 0, y: 0 };
  }

  return {
    text: item.text,
    isDragging: isDragging,
    x: differenceOffset.x + initialOffset.x + window.scrollX,
    y: differenceOffset.y + initialOffset.y + window.scrollY,
  };
};
