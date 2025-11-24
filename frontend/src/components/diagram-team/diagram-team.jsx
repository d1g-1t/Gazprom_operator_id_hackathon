import { useDispatch } from "react-redux";

import { Handle, Position } from "@xyflow/react";

import styles from "./diagram-team.module.css";

import {
  setSidebarStatus,
  setSidebarUser,
  setSidebarTeam,
  setSidebarComponent,
} from "../../services/sidebar/reducer";

import team_icon from "../../images/team_icon.svg";

function DiagramTeam(props) {
  const dispatch = useDispatch();

  const handleTeamShow = () => {
    dispatch(setSidebarStatus(true));
    dispatch(setSidebarUser(null));
    dispatch(setSidebarTeam(props.data.id));
    dispatch(setSidebarComponent(null));
  };

  let teamStyle = 0;
  if (props.data.name.includes("Девелопмент")) {
    teamStyle = styles.diagram_team__link_one;
  } else if (props.data.name.includes("Дизайн")) {
    teamStyle = styles.diagram_team__link_two;
  } else if (props.data.name.includes("Девопсы")) {
    teamStyle = styles.diagram_team__link_three;
  } else if (props.data.name.includes("Анализ")) {
    teamStyle = styles.diagram_team__link_four;
  }

  return (
    <div className={styles.diagram_team}>
      <Handle type="source" position={Position.Bottom} />
      <button
        htmltype="button"
        type="primary"
        onClick={handleTeamShow}
        className={`${styles.diagram_team__link} ${teamStyle}`}
      >
        <img
          className={styles.diagram_team__icon}
          src={team_icon}
          alt="team-icon"
        />
        <div className={styles.diagram_team__name}>{props.data.name}</div>
      </button>
      <Handle type="target" position={Position.Top} />
    </div>
  );
}

export default DiagramTeam;
