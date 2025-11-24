import { useDispatch } from "react-redux";

import { Handle, Position } from "@xyflow/react";

import styles from "./diagram-user.module.css";

import {
  setSidebarStatus,
  setSidebarUser,
  setSidebarComponent,
} from "../../services/sidebar/reducer";

function DiagramUser(props) {
  const dispatch = useDispatch();

  const handleUserShow = () => {
    dispatch(setSidebarStatus(true));
    dispatch(setSidebarUser(props.data.id));
    dispatch(setSidebarComponent(null));
  };

  let userStyle = 0;
  if (props.data.departmentId === 203) {
    userStyle = styles.diagram_user__link_one;
  } else if (props.data.departmentId === 202) {
    userStyle = styles.diagram_user__link_two;
  } else if (props.data.departmentId === 226) {
    userStyle = styles.diagram_user__link_three;
  } else if (props.data.departmentId === 212) {
    userStyle = styles.diagram_user__link_four;
  }

  return (
    <div className={styles.diagram_user}>
      <Handle type="source" position={Position.Bottom} />
      <button
        htmltype="button"
        type="primary"
        onClick={handleUserShow}
        className={`${styles.diagram_user__link} ${userStyle}`}
      >
        <img
          className={styles.diagram_user__avatar}
          src={props.data.photo}
          alt="avatar"
        />
        <div className={styles.diagram_user__name}>{props.data.first_name}</div>
        <div className={styles.diagram_user__surname}>
          {props.data.last_name}
        </div>
      </button>
    </div>
  );
}

export default DiagramUser;
