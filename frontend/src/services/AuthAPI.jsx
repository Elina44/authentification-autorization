/* eslint-disable consistent-return */
import axios from "axios";
import jwtDecode from "jwt-decode";

function logout() {
  // supprimer le authToken du local storage
  window.localStorage.removeItem("authToken");
  // supprimer les autorisations du header
  delete axios.defaults.headers.Authorization;
  // vider le contexte
}

function setAxiosToken(token) {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function isCurrentUser() {
  // Vérifier la présence d'un token dans le localStorage
  const token = window.localStorage.getItem("authToken");

  // Vérifier si le token est toujours valide
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      const payload = jwtDecode(window.localStorage.getItem("authToken"));
      return payload;
    }
  }
}

function setup() {
  // Vérifier la présence d'un token dans le localStorage
  const token = window.localStorage.getItem("authToken");

  // Vérifier si le token est toujours valide
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      setAxiosToken(token);
      isCurrentUser();
    }
  }
}

function isAuthenticated() {
  // Vérifier la présence d'un token dans le localStorage
  const token = window.localStorage.getItem("authToken");

  // Vérifier si le token est toujours valide
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      return true;
    }
    return false;
  }
  return false;
}

export default {
  logout,
  setup,
  isAuthenticated,
  isCurrentUser,
  setAxiosToken,
};
