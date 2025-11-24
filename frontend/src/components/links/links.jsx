import { Link } from "react-router-dom";

import styles from "./links.module.css";

import tg from "../../images/tg_icon.svg";
import teams from "../../images/teams_icon.svg";
import gira from "../../images/jira_icon.svg";

function Links({ links }) {
  return (
    <div className={styles.links}>
      <ul className={styles.links__container}>
        <Link to={links[0]} className={styles.links__item_icon}>
          <img src={tg} alt="иконка телеграмма" />
        </Link>
        <Link to={links[1]} className={styles.links__item_icon}>
          <img src={teams} alt="иконка тимс" />
        </Link>
        <Link to={links[2]} className={styles.links__item_icon}>
          <img src={gira} alt="иконка джира" />
        </Link>
      </ul>
    </div>
  );
}

export default Links;
