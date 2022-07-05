function enableResizable(targetDom) {
  const resizerItemList = [...document.querySelectorAll(' .draggable-cropper-resizer-item')];
  const minWidth = 100;
  const minHeight = 100;
  let originalWidth = 0;
  let originalHeight = 0;
  let originalX = 0;
  let originalY = 0;
  let originalMouseX = 0;
  let originalMouseY = 0;
  for (let i = 0; i < resizerItemList.length; i++) {
    const currentResizer = resizerItemList[i];
    currentResizer.addEventListener('mousedown', (e) => {
      e.preventDefault();
      originalWidth = Math.floor(
        window.getComputedStyle(targetDom, null).getPropertyValue('width').replace('px', '')
      );
      originalHeight = Math.floor(
        window.getComputedStyle(targetDom, null).getPropertyValue('height').replace('px', '')
      );
      originalX = targetDom.getBoundingClientRect().left;
      originalY = targetDom.getBoundingClientRect().top;
      originalMouseX = e.pageX;
      originalMouseY = e.pageY;
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);
    });

    function getDraggableCroperPos(resizerItemList) {
      return resizerItemList
        .map((resizerItem) => {
          return {
            className: resizerItem.classList[1],
            pos: resizerItem.getBoundingClientRect(),
          };
        })
        .map((resizerItemInfo) => {
          return {
            className: resizerItemInfo.className,
            top: resizerItemInfo.pos.top,
            left: resizerItemInfo.pos.left,
            right: resizerItemInfo.pos.right,
            bottom: resizerItemInfo.pos.bottom,
            width: resizerItemInfo.pos.width,
            height: resizerItemInfo.pos.height,
          };
        });
    }

    function getOppositeDraggaleCropperDom(resizerItemList, className) {
      return getDraggableCroperPos(resizerItemList).filter((itemInfo) => {
        return itemInfo.className === className;
      })[0];
    }

    function resize(e) {
      console.log('resize');
      window.localStorage.setItem('isResizeMode', true);
      setUpEdgeDom();

      if (currentResizer.classList.contains('draggable-cropper-top-left')) {
        const width = originalWidth - (e.pageX - originalMouseX);
        const height = originalHeight - (e.pageY - originalMouseY);
        if (width > 0 && height > 0) {
          targetDom.style.width = width + 'px';
          targetDom.style.height = height + 'px';
          targetDom.style.top = originalMouseY + (e.pageY - originalMouseY) + 'px';
          targetDom.style.left = originalMouseX + (e.pageX - originalMouseX) + 'px';
        } else if (width <= 0 && height > 0) {
          targetDom.style.width = Math.abs(width) + 'px';
          targetDom.style.height = height + 'px';
          targetDom.style.top = originalMouseY + (e.pageY - originalMouseY) + 'px';
        } else if (width > 0 && height <= 0) {
          targetDom.style.width = width + 'px';
          targetDom.style.height = Math.abs(height) + 'px';
          targetDom.style.left = originalMouseX + (e.pageX - originalMouseX) + 'px';
        } else {
          targetDom.style.width = Math.abs(width) + 'px';
          targetDom.style.height = Math.abs(height) + 'px';
        }
      }
      if (currentResizer.classList.contains('draggable-cropper-top-right')) {
        const width = originalWidth + (e.pageX - originalMouseX);
        const height = originalHeight - (e.pageY - originalMouseY);
        if (width > 0 && height > 0) {
          targetDom.style.width = width + 'px';
          targetDom.style.height = height + 'px';
          targetDom.style.top = originalMouseY + (e.pageY - originalMouseY) + 'px';
        } else if (width <= 0 && height > 0) {
          targetDom.style.width = Math.abs(width) + 'px';
          targetDom.style.height = height + 'px';
          targetDom.style.top = originalMouseY + (e.pageY - originalMouseY) + 'px';
          targetDom.style.left = originalMouseX + (e.pageX - originalMouseX) + 'px';
        } else if (width > 0 && height <= 0) {
          targetDom.style.width = width + 'px';
          targetDom.style.height = Math.abs(height) + 'px';
        } else {
          targetDom.style.width = Math.abs(width) + 'px';
          targetDom.style.height = Math.abs(height) + 'px';
          targetDom.style.left = originalMouseX + (e.pageX - originalMouseX) + 'px';
        }
      }

      if (currentResizer.classList.contains('draggable-cropper-bottom-left')) {
        const width = originalWidth - (e.pageX - originalMouseX);
        const height = originalHeight + (e.pageY - originalMouseY);
        if (width > 0 && height > 0) {
          targetDom.style.width = width + 'px';
          targetDom.style.height = height + 'px';
          targetDom.style.left = originalMouseX + (e.pageX - originalMouseX) + 'px';
        } else if (width <= 0 && height > 0) {
          targetDom.style.width = Math.abs(width) + 'px';
          targetDom.style.height = height + 'px';
        } else if (width > 0 && height <= 0) {
          targetDom.style.width = width + 'px';
          targetDom.style.height = Math.abs(height) + 'px';
          targetDom.style.top = originalMouseY + (e.pageY - originalMouseY) + 'px';
          targetDom.style.left = originalMouseX + (e.pageX - originalMouseX) + 'px';
        } else {
          targetDom.style.width = Math.abs(width) + 'px';
          targetDom.style.height = Math.abs(height) + 'px';
          targetDom.style.top = originalMouseY + (e.pageY - originalMouseY) + 'px';
        }
      }
      if (currentResizer.classList.contains('draggable-cropper-bottom-right')) {
        const width = originalWidth + (e.pageX - originalMouseX);
        const height = originalHeight + (e.pageY - originalMouseY);
        if (width > 0 && height > 0) {
          targetDom.style.width = width + 'px';
          targetDom.style.height = height + 'px';
        } else if (width <= 0 && height > 0) {
          targetDom.style.width = Math.abs(width) + 'px';
          targetDom.style.height = height + 'px';
          targetDom.style.left = originalMouseX + (e.pageX - originalMouseX) + 'px';
        } else if (width > 0 && height <= 0) {
          targetDom.style.width = width + 'px';
          targetDom.style.height = Math.abs(height) + 'px';
          targetDom.style.top = originalMouseY + (e.pageY - originalMouseY) + 'px';
        } else {
          targetDom.style.width = Math.abs(width) + 'px';
          targetDom.style.height = Math.abs(height) + 'px';
          targetDom.style.top = originalMouseY + (e.pageY - originalMouseY) + 'px';
          targetDom.style.left = originalMouseX + (e.pageX - originalMouseX) + 'px';
        }
      }

      if (currentResizer.classList.contains('draggable-cropper-edge-top')) {
        const height = originalHeight - (e.pageY - originalMouseY);
        if (height > 0) {
          targetDom.style.height = height + 'px';
          targetDom.style.top = originalMouseY + (e.pageY - originalMouseY) + 'px';
        } else {
          targetDom.style.height = Math.abs(height) + 'px';
        }
      }
      if (currentResizer.classList.contains('draggable-cropper-edge-bottom')) {
        const height = originalHeight + (e.pageY - originalMouseY);

        if (height > 0) {
          targetDom.style.height = height + 'px';
        } else {
          targetDom.style.height = Math.abs(height) + 'px';
          targetDom.style.top = originalMouseY + (e.pageY - originalMouseY) + 'px';
        }
      }
      if (currentResizer.classList.contains('draggable-cropper-edge-left')) {
        const width = originalWidth - (e.pageX - originalMouseX);

        if (width > 0) {
          targetDom.style.width = width + 'px';
          targetDom.style.left = originalMouseX + (e.pageX - originalMouseX) + 'px';
        } else {
          targetDom.style.width = Math.abs(width) + 'px';
        }
      }
      if (currentResizer.classList.contains('draggable-cropper-edge-right')) {
        const width = originalWidth + (e.pageX - originalMouseX);
        if (width > 0) {
          targetDom.style.width = width + 'px';
        } else {
          targetDom.style.left = originalMouseX + (e.pageX - originalMouseX) + 'px';
          targetDom.style.width = Math.abs(width) + 'px';
        }
      }
    }
    function stopResize() {
      console.log('stopResize');
      window.localStorage.setItem('isResizeMode', false);
      window.removeEventListener('mousemove', resize);
    }
    function setUpEdgeDom() {
      const edgeDomClassNameList = [
        'draggable-cropper-edge-top',
        'draggable-cropper-edge-bottom',
        'draggable-cropper-edge-left',
        'draggable-cropper-edge-right',
      ];
      const draggableCropperDom = document.querySelector('.draggable-cropper-wrapper');
      const draggableCropperDomPositionInfo = draggableCropperDom.getBoundingClientRect();
      for (let index = 0; index < edgeDomClassNameList.length; index++) {
        const targetEdgeDomClassName = edgeDomClassNameList[index];
        const targetEdgeDom = targetDom.querySelector(`.${targetEdgeDomClassName}`);
        if (targetEdgeDomClassName === 'draggable-cropper-edge-top') {
          targetEdgeDom.style.left =
            Math.floor(draggableCropperDomPositionInfo.width / 2) - 5 + 'px';
        }
        if (targetEdgeDomClassName === 'draggable-cropper-edge-bottom') {
          targetEdgeDom.style.left =
            Math.floor(draggableCropperDomPositionInfo.width / 2) - 5 + 'px';
        }
        if (targetEdgeDomClassName === 'draggable-cropper-edge-left') {
          targetEdgeDom.style.bottom =
            Math.floor(draggableCropperDomPositionInfo.height / 2) - 5 + 'px';
        }
        if (targetEdgeDomClassName === 'draggable-cropper-edge-right') {
          targetEdgeDom.style.bottom =
            Math.floor(draggableCropperDomPositionInfo.height / 2) - 5 + 'px';
        }
      }
    }
  }
}

function enableDraggable(targetDom) {
  let moveX = 0;
  let moveY = 0;
  let prevClientX = 0;
  let prevClientY = 0;
  targetDom.onmousedown = dragStart;
  function dragStart(event) {
    console.log('dragStart');
    event = event || window.event;
    event.preventDefault();
    prevClientX = event.clientX;
    prevClientY = event.clientY;
    document.onmouseup = dragEnd;
    document.onmousemove = dragOver;
  }
  function dragOver(event) {
    console.log('dragOver');
    if (window.localStorage.getItem('isResizeMode') === 'true') {
      return;
    }
    event = event || window.event;
    event.preventDefault();
    moveX = prevClientX - event.clientX;
    moveY = prevClientY - event.clientY;
    prevClientX = event.clientX;
    prevClientY = event.clientY;
    targetDom.style.top = targetDom.offsetTop - moveY + 'px';
    targetDom.style.left = targetDom.offsetLeft - moveX + 'px';
  }
  function dragEnd() {
    console.log('dragEnd');
    window.localStorage.setItem('isResizeMode', false);
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

const itemDom = document.querySelector('.draggable-cropper-resizable-item');

enableDraggable(itemDom);
enableResizable(itemDom);
