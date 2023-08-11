import React from 'react';
import { createPortal } from 'react-dom';

function Modal({ children, isOpen }) {
    return createPortal(
        <div
            className={`fixed top-0 h-full w-full flex justify-center items-center z-30 backdrop-blur-md ${
                isOpen ? 'block' : 'hidden'
            }`}
            onClick={(e) => e.stopPropagation()}
        >
            {children}
        </div>,
        document.getElementById('portal')
    );
}

export default Modal;
