import axios from "axios";
import { FETCH_ROOMS, LOGIN_USER, FETCH_CURRENT_ROOM } from "./types";

const ROOT_URL = 'http://localhost:3001';

export const fetchRooms = (userId) => dispatch => {
  const url = `${ROOT_URL}/user/${userId}/rooms`;

  axios.get(url)
  .then((response) => {
    dispatch({ type: FETCH_ROOMS, payload: response.data })
    console.log(response.data);
  })
  .catch((err) => {
    console.log(`There was an error with fetching the user's rooms`, err);
  })
};

export const loginUser = (username, password) => dispatch => {
  const url = `${ROOT_URL}/login`;

  axios.post(url, {
    username: username,
    password: password
  })
  .then(function (response) {
    console.log(response.data);
    dispatch({ type: LOGIN_USER, payload: response.data});
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const fetchCurrentRoom = (userId, roomId) => dispatch => {
  const url = `${ROOT_URL}/user/${userId}/room/${roomId}`;

  axios.get(url)
  .then((response) => {
    dispatch({ type: FETCH_CURRENT_ROOM, payload: response.data })
    console.log('Fetch Current Room Response', response.data);
  })
  .catch((err) => {
    console.log(`There was an error with fetching the user's current room`, err);
  }, { withCredentials: true })





}