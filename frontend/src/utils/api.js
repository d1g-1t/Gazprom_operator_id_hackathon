import { BASE_URL, LOGIN, USERS, PROJECTS } from "./constants";

const getResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}${LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(getResponse);
};

export const getUserInfo = () => {
  return fetch(`${BASE_URL}${USERS}/402`, {
    // id 402 установлен для пропуска этапа авторизации
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `${BASE_URL}`,
    },
  }).then(getResponse);
};

export const getWorkerInfo = (workerId) => {
  return fetch(`${BASE_URL}${USERS}/${workerId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `${BASE_URL}`,
    },
  }).then(getResponse);
};

export const getUsersInfo = () => {
  return fetch(`${BASE_URL}${USERS}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `${BASE_URL}`,
    },
  }).then(getResponse);
};

export const getProjectsInfo = () => {
  return fetch(`${BASE_URL}${PROJECTS}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `${BASE_URL}`,
    },
  }).then(getResponse);
};
