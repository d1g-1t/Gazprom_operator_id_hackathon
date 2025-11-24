import { createPortal } from "react-dom";

import { CloseOutlined } from "@ant-design/icons";

import styles from "./modal.module.css";

import ModalOverlay from "../modal-overlay/modal-overlay";

const portal = document.getElementById("portal");

function Modal({ children, handleOnClose, isLoading }) {
  return createPortal(
    <section className={styles.modal}>
      <ModalOverlay handleOnClose={handleOnClose} />
      <div className={styles.modal__container}>
        {!isLoading && (
          <CloseOutlined
            onClick={handleOnClose}
            className={styles.modal__close_icon}
          />
        )}
        {children}
      </div>
    </section>,
    portal
  );
}

export default Modal;
