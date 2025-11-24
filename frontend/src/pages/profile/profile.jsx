import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./profile.module.css";

import User from "../../components/user/user";
import Contacts from "../../components/contacts/contacts";
import Skills from "../../components/skills/skills";
import TeamProfile from "../../components/team-profile/team-profile";

import { selectUser } from "../../services/user/reducer";
import { selectWorker } from "../../services/worker/reducer";

function Profile() {
  const location = useLocation();

  const user = useSelector(selectUser);
  const worker = useSelector(selectWorker);

  const currentUser = location.pathname === "/" ? user : worker;

  return (
    <div>
      {currentUser ? (
        <div className={styles.profile}>
          <User user={currentUser} />
          <Contacts user={currentUser} />
          <Skills user={currentUser} />
          <TeamProfile user={currentUser} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Profile;
