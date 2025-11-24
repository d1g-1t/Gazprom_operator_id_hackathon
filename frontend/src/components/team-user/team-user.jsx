import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./team-user.module.css";

import { loadWorker } from "../../services/worker/actions";

import { USERS } from "../../utils/constants";

function TeamUser(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserShow = () => {
    dispatch(loadWorker(props.data.id));
    navigate(`${USERS}/${props.data.id}`);
  };

  const isUserLead = props.data.grade === "Team Lead";

  return (
    <div className={styles.diagram__user}>
      <button
        htmltype="button"
        type="primary"
        onClick={handleUserShow}
        className={
          isUserLead
            ? styles.diagram__lead_user_link
            : styles.diagram__user_link
        }
      >
        {isUserLead ? (
          <p className={styles.diagram__user_note}>Вся команда</p>
        ) : (
          ""
        )}
        <img
          className={
            isUserLead
              ? styles.diagram__lead_user_avatar
              : styles.diagram__user_avatar
          }
          src={props.data.photo}
          alt="avatar"
        />
        <div className={styles.diagram__user_name}>{props.data.first_name}</div>
        <div className={styles.diagram__user_name}>{props.data.last_name}</div>
        <div
          className={
            isUserLead
              ? styles.diagram__lead_user_position
              : styles.diagram__user_position
          }
        >
          {props.data.position}
        </div>
      </button>
    </div>
  );
}

export default TeamUser;
