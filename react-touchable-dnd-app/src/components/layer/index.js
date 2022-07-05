import { useSampleDragLayer } from '../../hooks/useSampleDragLayer';
import { SampleDragLayerPresenter } from '../presenter';

const SampleDragLayer = () => {
  const { isDragging, ...props } = useSampleDragLayer();
  if (!isDragging) {
    return null;
  }

  return <SampleDragLayerPresenter {...props} />;
};

export { SampleDragLayer };
