import React from "react";

import "./index.scss";

const Modal = ({ text, handle, onClose, isModalVisible }) => {
  return isModalVisible ? (
    <div className="modal-container">
      <div className="modal">
        <p className="modal__text">{text}</p>
        <button onClick={() => onClose()} className="modal__button--cancel">
          Cancel
        </button>
        <button onClick={() => handle()} className="modal__button--delete">
          Delete
        </button>
      </div>
    </div>
  ) : null;
};

export default Modal;
