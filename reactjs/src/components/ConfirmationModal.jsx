import React, { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import "../Styles/confirm.scss";

const ConfirmationModal = ({ message, onConfirm, onCancel, isOpen }) => {
    return (
        <Modal
            isOpen={isOpen}
            className="confirmation-modal"
            overlayClassName="confirmation-modal-overlay"
        >
            <div>
                <p>{message}</p>
                <button onClick={onConfirm}>Confirm</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </Modal>
    );
};

ConfirmationModal.propTypes = {
    message: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

export default ConfirmationModal;
