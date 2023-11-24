import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";

import Score from "../../components/Score";

import "./index.scss";

const Modal = ({
  text,
  handle,
  onClose,
  isModalVisible,
  child,
  id,
  setRecipe,
}) => {
  const user = useSelector((state) => state.user);
  const [score, setScore] = useState(0);

  const rateRecipe = async () => {
    try {
      const response = await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}/recipes/score/${id}`,
        data: {
          userId: user.id,
          score: score,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      onClose();
      setRecipe(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return isModalVisible ? (
    <div className="modal-container">
      <div className="modal">
        <p className="modal__text">{text}</p>
        {child && <Score setScore={setScore} />}
        {!child ? (
          <>
            <button onClick={() => onClose()} className="modal__button--cancel">
              Cancel
            </button>
            <button onClick={() => handle()} className="modal__button--delete">
              Delete
            </button>
          </>
        ) : (
          <>
            <button onClick={onClose} className="modal__button--cancel">
              Cancel
            </button>
            <button
              onClick={() => rateRecipe()}
              className="modal__button--delete"
            >
              Set Score
            </button>
          </>
        )}
      </div>
    </div>
  ) : null;
};

Modal.propTypes = {
  text: PropTypes.string,
  handle: PropTypes.func,
  onClose: PropTypes.func,
  isModalVisible: PropTypes.bool.isRequired,
  child: PropTypes.bool,
  id: PropTypes.string,
  setRecipe: PropTypes.func,
};

export default Modal;
