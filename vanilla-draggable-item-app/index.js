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

const itemDom = document.querySelector('.item');
enableDraggable(itemDom);
