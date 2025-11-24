import styles from "./team-profile.module.css";

import TeamCard from "../team-card/team-card";

function TeamProfile({ user }) {
  return (
    <div className={styles.team_profile}>
      <div className={styles.team_profile__container}>
        <div className={styles.team_profile__header_container}>
          <h3 className={styles.team_profile__title}>Активные продукты</h3>
          <p className={styles.team_profile__title_link}>Смотреть все</p>
        </div>
        <TeamCard user={user} />
      </div>
    </div>
  );
}

export default TeamProfile;
