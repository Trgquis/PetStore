import React, { useEffect } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import "../Styles/alert.scss";

const CustomAlert = ({ message, type, isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [isOpen, onClose]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className={`custom-alert ${type}`}
            overlayClassName="custom-alert-overlay"
        >
            <div>
                {type === 0 && <span className="checkmark"></span>}
                {type === 1 && <span className="crossmark"></span>}
                {message}
            </div>
        </Modal>
    );
};

CustomAlert.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default CustomAlert;
