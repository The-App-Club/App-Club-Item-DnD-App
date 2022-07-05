function enableResizableDom(targetDom, resizeCropperSelector) {
  const resizerItemDom = document.querySelector(`${resizeCropperSelector}`);
  const skeltonLeftDom = document.querySelector(
    `.draggable-cropper-resizer-item-skelton-left`
  );
  const skeltonRightDom = document.querySelector(
    `.draggable-cropper-resizer-item-skelton-right`
  );
  const videoThumbnailDom = document.querySelector(`.video-thumbnail`);
  const videoThumbnailDomStartOffset = Math.floor(
    removeTailUnit(getCssPropertyValue(videoThumbnailDom, 'padding-left'))
  );
  const videoThumbnailDomEndOffset = Math.floor(
    removeTailUnit(getCssPropertyValue(videoThumbnailDom, 'padding-right'))
  );
  const videoThumbnailDomLeft = videoThumbnailDom.getBoundingClientRect().left;
  const videoThumbnailDomRight =
    videoThumbnailDomLeft +
    videoThumbnailDom.offsetWidth -
    videoThumbnailDomEndOffset;
  const videoThumbnailDomWidth =
    document.querySelector(`.video-thumbnail`).offsetWidth;
  let resizerItemDomLeft = resizerItemDom.getBoundingClientRect().left;
  let originalWidth = 0;
  let originalHeight = 0;
  let originalMouseX = 0;
  let originalMouseY = 0;
  let resizerItemBaseWidth = targetDom.offsetWidth;
  let moveX = 0;
  let actualMoveX = 0;

  if (
    resizeCropperSelector ===
    '.draggable-cropper-resizer-item.draggable-cropper-edge-left'
  ) {
    const skeltonDomWidth =
      resizerItemDomLeft - videoThumbnailDomLeft - videoThumbnailDomStartOffset;
    skeltonLeftDom.style.left = `${resizerItemDom.offsetLeft + 1}px`;
    skeltonLeftDom.style.width = `${skeltonDomWidth}px`;
  }
  if (
    resizeCropperSelector ===
    '.draggable-cropper-resizer-item.draggable-cropper-edge-right'
  ) {
    const skeltonDomWidth = videoThumbnailDomRight - resizerItemDomLeft;
    skeltonRightDom.style.right = `${actualMoveX + 1}px`;
    skeltonRightDom.style.width = `${skeltonDomWidth - 1}px`;
  }

  resizerItemDom.onmousedown = dragStart;

  function removeTailUnit(targetPixelWithUnit) {
    return Number(targetPixelWithUnit.replace(/px$/, ''));
  }

  function getCssPropertyValue(targetDom, targetCssPropertyName) {
    return window
      .getComputedStyle(targetDom)
      .getPropertyValue(targetCssPropertyName);
  }

  function dragStart(event) {
    event = event || window.event;
    event.preventDefault();
    originalWidth = Math.floor(
      removeTailUnit(getCssPropertyValue(targetDom, 'width'))
    );
    originalHeight = Math.floor(
      removeTailUnit(getCssPropertyValue(targetDom, 'height'))
    );
    originalMouseX = event.pageX;
    originalMouseY = event.pageY;
    document.onmouseup = dragEnd;
    document.onmousemove = dragOver;
  }
  function dragOver(event) {
    event = event || window.event;
    event.preventDefault();
    moveX = originalMouseX - event.pageX;
    actualMoveX = resizerItemBaseWidth - resizerItemDom.offsetLeft;
    resizerItemDomLeft = resizerItemDom.getBoundingClientRect().left;
    originalMouseX = event.pageX;
    if (
      resizeCropperSelector ===
      '.draggable-cropper-resizer-item.draggable-cropper-edge-left'
    ) {
      const skeltonDomWidth =
        resizerItemDomLeft -
        videoThumbnailDomLeft -
        videoThumbnailDomStartOffset;
      skeltonLeftDom.style.left = `${resizerItemDom.offsetLeft + 1}px`;
      skeltonLeftDom.style.width = `${skeltonDomWidth}px`;
    }
    if (
      resizeCropperSelector ===
      '.draggable-cropper-resizer-item.draggable-cropper-edge-right'
    ) {
      const skeltonDomWidth = videoThumbnailDomRight - resizerItemDomLeft;
      skeltonRightDom.style.right = `${actualMoveX - 1}px`;
      skeltonRightDom.style.width = `${skeltonDomWidth}px`;
    }
    resizerItemDom.style.left = `${resizerItemDom.offsetLeft - moveX}px`;
  }
  function dragEnd() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
const draggableCropperResizableItemDom = document.querySelector(
  '.draggable-cropper-resizable-item'
);
enableResizableDom(
  draggableCropperResizableItemDom,
  '.draggable-cropper-resizer-item.draggable-cropper-edge-left'
);
enableResizableDom(
  draggableCropperResizableItemDom,
  '.draggable-cropper-resizer-item.draggable-cropper-edge-right'
);
