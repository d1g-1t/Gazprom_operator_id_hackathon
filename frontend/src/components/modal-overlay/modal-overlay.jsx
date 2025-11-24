import { useEffect } from "react";

import styles from "./modal-overlay.module.css";

function ModalOverlay({ handleOnClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        if (handleOnClose) handleOnClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [handleOnClose]);

  return (
    <section className={styles.modal_overlay} onClick={handleOnClose}></section>
  );
}

export default ModalOverlay;
