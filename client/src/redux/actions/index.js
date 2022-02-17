import axios from "axios";
import { FETCH_ROOMS } from "./types";

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
}