import styles from "./not-found-404.module.css";

function NotFound404() {
  return (
    <div className={styles.error}>
      <h2 className={styles.error_text}>Cтраница не найдена</h2>
      <p className={styles.error_number}>404</p>
    </div>
  );
}

export default NotFound404;
