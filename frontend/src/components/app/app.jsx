import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./app.module.css";

import Header from "../header/header";

import Catalog from "../../pages/catalog/catalog";
import Company from "../../pages/company/company";
import Diagram from "../../pages/diagram/diagram";
import NotFound404 from "../../pages/not-found-404/not-found-404";
import Profile from "../../pages/profile/profile";
import Team from "../../pages/team/team";

import Modal from "../modal/modal";
import Preloader from "../preloader/preloader";

import { loadUser } from "../../services/user/actions";
import { loadUsers } from "../../services/users/actions";
import { loadProjects } from "../../services/projects/actions";

import { selectUserLoading } from "../../services/user/reducer";
import { selectUsersLoading } from "../../services/users/reducer";
import { selectWorkerLoading } from "../../services/worker/reducer";
import { selectProjectsLoading } from "../../services/projects/reducer";

import {
  HOME,
  DIAGRAM,
  COMPANY,
  CATALOG,
  TEAM,
  NUMBER,
  USERS,
} from "../../utils/constants";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadUsers());
    dispatch(loadProjects());
  }, [dispatch]);

  const isUserLoading = useSelector(selectUserLoading);
  const isUsersLoading = useSelector(selectUsersLoading);
  const isWorkerLoading = useSelector(selectWorkerLoading);
  const isProjectsLoading = useSelector(selectProjectsLoading);

  const isLoading =
    isUserLoading || isUsersLoading || isWorkerLoading || isProjectsLoading;

  return (
    <div className={styles.page}>
      {isLoading && (
        <Modal isLoading={isLoading}>
          <Preloader />
        </Modal>
      )}
      <Header />
      {!isLoading && (
        <Routes>
          <Route path={HOME} element={<Profile />} />
          <Route path={DIAGRAM} element={<Diagram />} />
          <Route path={COMPANY} element={<Company />} />
          <Route path={CATALOG} element={<Catalog />} />
          <Route path={`${TEAM}${NUMBER}`} element={<Team />} />
          <Route path={`${USERS}${NUMBER}`} element={<Profile />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
