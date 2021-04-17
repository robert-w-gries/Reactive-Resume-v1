import { DialogContent, DialogOverlay } from '@reach/dialog';
import React, { useState } from 'react';
import Draggable from 'react-draggable';

const DraggableModal = ({ children, isOpen, ariaLabel, onClose }) => {
  const nodeRef = React.useRef(null);
  const [isDragging, setDragging] = useState(false);
  const handleClick = (e) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
    }
  }
  return (
    <DialogOverlay isOpen={isOpen} className="dialog-overlay">
      <Draggable
        nodeRef={nodeRef}
        grid={[25, 25]}
        onDrag={() => {
          if (!isDragging) {
            setDragging(true);
          }
        }}
        scale={1}>
          <DialogContent ref={nodeRef} className="dialog-content cursor-move absolute m-auto right-20 top-0 bottom-0 shadow-2xl h-3/4 max-h-modal max-w-modal" aria-label={ariaLabel}>
            <div className="flex flex-col h-full bg-white">
              <i className="self-end material-icons cursor-pointer text-3xl text-red-600 select-none" onClick={() => onClose()}>close</i>
              <div onClickCapture={handleClick} className="flex-1 pt-1 pb-4 px-4 overflow-y-scroll">
                {children}
              </div>
            </div>
          </DialogContent>
      </Draggable>
    </DialogOverlay>
  );
};

export default DraggableModal;
