import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Button } from "antd";

import styles from "./sidebar-team.module.css";

import CompanyCard from "../company-card/company-card";

import { selectUsers } from "../../services/users/reducer";

import { TEAM } from "../../utils/constants";

function SidebarTeam({ item }) {
  const location = useLocation();

  const navigate = useNavigate();

  const companyStructure = useSelector(selectUsers);

  const lead = companyStructure?.find((i) => i.id === item?.team_leadId);

  const handleTeamShow = () => {
    navigate(`${TEAM}/${item.id}`);
  };

  return (
    <div className={styles.sidebar_team}>
      {item ? (
        <div className={styles.sidebar_team__container}>
          <h3 className={styles.sidebar_team__point}>{item.name}</h3>
          <div className={styles.sidebar_team__point}>Performance команды</div>
          <p className={styles.sidebar_team__text}>{item.performance}</p>
          <div className={styles.sidebar_team__point}>Описание</div>
          <p className={styles.sidebar_team__text}>{item.description}</p>
          <div className={styles.sidebar_team__point}>Руководитель команды</div>
          <div className={styles.sidebar_team__lead_container}>
            <CompanyCard data={lead} />
          </div>
          {location.pathname.slice(0, 5) !== "/team" ? (
            <Button
              htmlType="button"
              type="primary"
              ghost
              onClick={handleTeamShow}
              className={styles.catalog__card_link}
            >
              Перейти в профиль команды
            </Button>
          ) : (
            ""
          )}
        </div>
      ) : (
        " "
      )}
    </div>
  );
}

export default SidebarTeam;
