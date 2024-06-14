import React from "react";
import styles from "./ConfirmationsModal.module.css";

interface ConfirmationModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalText}>
          <h3 style={{ fontWeight: "bold" }}>{title}</h3>
          <p>{message}</p>
        </div>

        <div className={styles.modalActions}>
          <button onClick={onCancel} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={onConfirm} className={styles.confirmButton}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
