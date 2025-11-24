import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./team-card.module.css";

import { v4 as uuidv4 } from "uuid";

import { selectUsers } from "../../services/users/reducer";
import { selectProjects } from "../../services/projects/reducer";
import { Button } from "antd";

import { setSidebarTeam } from "../../services/sidebar/reducer";

import { TEAM } from "../../utils/constants";

function TeamCard({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const companyStructure = useSelector(selectUsers);
  const companyDiagram = useSelector(selectProjects);

  const location = useLocation();

  const catalogLocation = location.pathname === "/";

  const projects = companyDiagram?.components.find(
    (i) => i.id === user.componentId
  );
  const teams = companyDiagram?.teams.find((i) => i.id === user.teamId);
  const teamUsers = [];

  teams?.usersId.forEach((id) => {
    companyStructure?.forEach((item) => {
      if (item.id === id) {
        teamUsers.push(item);
      }
    });
  });

  const handleTeamShow = () => {
    dispatch(setSidebarTeam(user.teamId));
    navigate(`${TEAM}/${user.teamId}`);
  };

  return (
    <div
      className={catalogLocation ? styles.team_card : styles.team_card__catalog}
    >
      {companyDiagram ? (
        <div className={styles.team_card__container}>
          {catalogLocation ? (
            <div>
              <h4 className={styles.team_card__title}>
                {projects ? projects.name : "В проектах не участвует"}
              </h4>

              <p className={styles.team_card__title_team}>
                {projects ? projects.type : ""}
              </p>
            </div>
          ) : (
            ""
          )}
          <div className={styles.team_card__team_container}>
            {teams ? (
              <Button
                htmlType="button"
                type="link"
                onClick={handleTeamShow}
                className={styles.team_card__team_link}
              >
                {teams.name}
              </Button>
            ) : (
              "В командах не состоит"
            )}

            <div className={styles.team_card__users_container}>
              {teamUsers.slice(0, 4).map((item, index) => (
                <div key={uuidv4()}>
                  <div
                    className={styles.team_card__users_picture_container}
                    style={{
                      right: `${index * 18}px`,
                      zIndex: index,
                      backgroundColor: `${
                        index > 2 && teamUsers.length > 4
                          ? "rgba(255, 216, 191, 1)"
                          : "none"
                      }`,
                    }}
                  >
                    <img
                      className={styles.team_card__users_picture}
                      src={item.photo}
                      alt="avatar"
                      style={{
                        opacity: `${
                          index > 2 && teamUsers.length > 4 ? "0" : "1"
                        }`,
                      }}
                    />
                    <p className={styles.team_card__users_number}>
                      {index > 2 && teamUsers.length > 4
                        ? `+ ${teamUsers.length - 3}`
                        : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default TeamCard;
