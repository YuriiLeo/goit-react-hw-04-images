import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { createPortal } from 'react-dom';
import { Overlay, ModalSize } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({onClick, path}) {

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown );
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    };
  })
  
  const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClick();
      }
    }

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClick();
    }
  }

  return createPortal(
      <Overlay onClick={handleBackdropClick}>
        <ModalSize>
           <img src={path} alt="Big img" />
        </ModalSize>
      </Overlay>,
      modalRoot,
    );
}

Modal.propTypes = {
  onClick: PropTypes.func,
  path: PropTypes.string.isRequired
}