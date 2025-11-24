import React from "react";

import styles from "./diagram-sidebar.module.css";

const Drag = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__title}>
        Вы можете добавить сотрудников в команды перетаскиванием элемента
      </div>
      <div className={styles.sidebar__items_container}>
        <div
          className={styles.sidebar__item}
          onDragStart={(event) => onDragStart(event, "Junior")}
          draggable
        >
          Junior
        </div>
        <div
          className={styles.sidebar__item}
          onDragStart={(event) => onDragStart(event, "Middle")}
          draggable
        >
          Middle
        </div>
        <div
          className={styles.sidebar__item}
          onDragStart={(event) => onDragStart(event, "Senior")}
          draggable
        >
          Senior
        </div>
      </div>
    </div>
  );
};

export default Drag;
