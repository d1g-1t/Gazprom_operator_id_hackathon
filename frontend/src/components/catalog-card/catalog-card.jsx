import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Button, Divider } from "antd";

import styles from "./catalog-card.module.css";

import Links from "../links/links";
import TeamCard from "../team-card/team-card";

import { loadWorker } from "../../services/worker/actions";

import { USERS } from "../../utils/constants";

function CatalogCard({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserShow = () => {
    dispatch(loadWorker(item.id));
    navigate(`${USERS}/${item.id}`);
  };

  return (
    <div className={styles.catalog_card}>
      {item ? (
        <div>
          <div className={styles.catalog_card__container}>
            <img
              className={styles.catalog_card__user_avatar}
              src={item.photo}
              alt="avatar"
            />
            <div className={styles.catalog_card__user_container}>
              <h4 className={styles.catalog_card__user_name}>
                {`${item.first_name} ${item.last_name}`}
              </h4>
              <p className={styles.catalog_card__user_timezone}>
                {`${item.town}, ${item.timezone}`}
              </p>
              <p className={styles.catalog_card__user_employment}>
                {item.employment_type}
              </p>
            </div>
          </div>
          <div className={styles.catalog_card__user_links}>
            <Links links={item.contacts.links} />
            <Button
              htmlType="button"
              type="primary"
              ghost
              onClick={handleUserShow}
              className={styles.catalog_card__link}
            >
              Перейти в профиль
            </Button>
          </div>
          <Divider className={styles.catalog_card__divider} />
          <p className={styles.catalog_card__user_position_label}>Должность</p>
          <p className={styles.catalog_card__user_position}>{item.position}</p>
          <TeamCard user={item} />
        </div>
      ) : (
        " "
      )}
    </div>
  );
}

export default CatalogCard;
