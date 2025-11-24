import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./company-card.module.css";

import { Handle, Position } from "@xyflow/react";

import { Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import Links from "../links/links";

import { loadWorker } from "../../services/worker/actions";

import { USERS } from "../../utils/constants";

function CompanyCard({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserShow = () => {
    dispatch(loadWorker(data.id));
    navigate(`${USERS}/${data.id}`);
  };

  return (
    <div className={styles.company__card}>
      <Handle type="source" position={Position.Top} />
      {data ? (
        <div>
          <div className={styles.company__card_container}>
            <img
              className={styles.company__card_user_avatar}
              src={data.photo}
              alt="avatar"
            />
            <div className={styles.company__card_user_container}>
              <Button
                htmlType="button"
                type="link"
                onClick={handleUserShow}
                className={styles.company__card_link}
              >
                Перейти в профиль
              </Button>
              <p className={styles.company__card_user_position}>
                {data.position}
              </p>
              <p className={styles.company__card_user_employment}>
                {data.employment_type}
              </p>
            </div>
            <MoreOutlined className={styles.company__card_dots} />
          </div>
          <h4 className={styles.company__card_user_name}>
            {`${data.first_name} ${data.last_name}`}
          </h4>
          <p className={styles.company__card_user_timezone}>{data.timezone}</p>
          <Links links={data.contacts} />
        </div>
      ) : (
        ""
      )}
      <Handle type="target" position={Position.Bottom} />
    </div>
  );
}

export default CompanyCard;
