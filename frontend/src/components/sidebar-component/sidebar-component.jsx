import { useSelector } from "react-redux";

import { Button, Tag } from "antd";

import styles from "./sidebar-component.module.css";

import CompanyCard from "../company-card/company-card";

import { selectUsers } from "../../services/users/reducer";

function SidebarComponent({ item }) {
  const companyStructure = useSelector(selectUsers);

  const lead = companyStructure?.find((i) => i.id === item.component_leadId);

  return (
    <div className={styles.sidebar_component}>
      {item ? (
        <div className={styles.sidebar_component__container}>
          <h3 className={styles.sidebar_component__point}>{item.name}</h3>
          <div className={styles.sidebar_component__point}>Описание</div>
          <p className={styles.sidebar_component__text}>{item.description}</p>
          <div className={styles.sidebar_component__point}>Статус</div>
          <Tag
            color="green"
            style={{
              width: "max-content",
            }}
          >
            {item.status}
          </Tag>
          <div className={styles.sidebar_component__point}>
            Владелец компоненты
          </div>
          <div className={styles.sidebar_component__lead_container}>
            <CompanyCard data={lead} />
          </div>
          <Button
            htmlType="button"
            type="primary"
            ghost
            className={styles.sidebar_component__button}
          >
            Полный отчет о состоянии сервиса
          </Button>
        </div>
      ) : (
        " "
      )}
    </div>
  );
}

export default SidebarComponent;
