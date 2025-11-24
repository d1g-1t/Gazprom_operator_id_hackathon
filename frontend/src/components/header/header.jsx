import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Input } from "antd";

import styles from "./header.module.css";

import { selectUser } from "../../services/user/reducer";
import { setSearchValue } from "../../services/search/reducer";

import gaz_logo from "../../images/gaz_logo.svg";

import { DIAGRAM, COMPANY, CATALOG } from "../../utils/constants";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);

  const { Search } = Input;

  const onSearch = (value) => {
    dispatch(setSearchValue(value));
    navigate(`${CATALOG}`);
  };

  return (
    <div className={styles.header}>
      <img className={styles.header__logo} src={gaz_logo} alt="логотип" />
      <ul className={styles.header__menu_container}>
        <li className={styles.header__menu_point}>
          <NavLink
            to={CATALOG}
            className={({ isActive }) =>
              isActive
                ? styles.header__menu_link_active
                : styles.header__menu_link
            }
          >
            Справочник сотрудников
          </NavLink>
        </li>
        <li className={styles.header__menu_point}>
          <NavLink
            to={COMPANY}
            className={({ isActive }) =>
              isActive
                ? styles.header__menu_link_active
                : styles.header__menu_link
            }
          >
            Структура компании
          </NavLink>
        </li>
        <li className={styles.header__menu_point}>
          <NavLink
            to={DIAGRAM}
            className={({ isActive }) =>
              isActive
                ? styles.header__menu_link_active
                : styles.header__menu_link
            }
          >
            Организационная диаграмма
          </NavLink>
        </li>
      </ul>
      <Search
        placeholder="Поиск"
        size="large"
        style={{
          width: 440,
        }}
        allowClear
        onSearch={onSearch}
      />

      {user ? (
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? styles.header_profile_container_active
              : styles.header_profile_container
          }
        >
          <p
            className={styles.header__profile_name}
          >{`${user.first_name} ${user.last_name[0]}.`}</p>
          <img
            className={styles.header__profile_photo}
            src={user.photo}
            alt="фото"
          />
        </NavLink>
      ) : (
        ""
      )}
    </div>
  );
}

export default Header;
