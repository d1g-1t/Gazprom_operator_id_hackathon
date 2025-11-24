import { useDispatch } from "react-redux";

import { Handle, Position } from "@xyflow/react";

import styles from "./diagram-component.module.css";

import component_icon from "../../images/component_icon.svg";

import {
  setSidebarStatus,
  setSidebarUser,
  setSidebarTeam,
  setSidebarComponent,
} from "../../services/sidebar/reducer";

function DiagramComponent(props) {
  const dispatch = useDispatch();

  const handleComponentShow = () => {
    dispatch(setSidebarStatus(true));
    dispatch(setSidebarUser(null));
    dispatch(setSidebarTeam(null));
    dispatch(setSidebarComponent(props.data.id));
  };

  return (
    <div className={styles.diagram_component}>
      <Handle type="source" position={Position.Bottom} />
      <button
        htmltype="button"
        type="primary"
        onClick={handleComponentShow}
        className={styles.diagram_component__link}
      >
        <img
          className={styles.diagram__component_icon}
          src={component_icon}
          alt="team-icon"
        />
        <div className={styles.diagram_component__name}>{props.data.name}</div>
      </button>
      <Handle type="target" position={Position.Top} />
    </div>
  );
}

export default DiagramComponent;
