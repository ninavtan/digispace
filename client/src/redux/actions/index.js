import axios from "axios";
import res from "express/lib/response";
import { FETCH_ROOMS, LOGIN_USER, REGISTER_USER, FETCH_CURRENT_ROOM, FETCH_GALLERY_IMAGES, POST_GALLERY_IMAGE } from "./types";

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
    dispatch({ type: LOGIN_USER, payload: response.data});
    
  })
  // .then(function(response) {
  //   dispatch({ type: FETCH_ROOMS, payload: response.data.id});

  // })
  .catch(function (error) {
    console.log(error);
  });
};

export const registerUser = (email, username, password) => dispatch => {
  const url = `${ROOT_URL}/register`;

  axios.post(url, {
    email: email,
    username: username,
    password: password
  })
  .then(function (response) {
    console.log(response.data);
    dispatch({ type: REGISTER_USER, payload: response.data});
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
  })
  .catch((err) => {
    console.log(`There was an error with fetching the user's current room`, err);
  }, { withCredentials: true })

}

export const fetchGalleryImages = (roomId, userId) => dispatch => {
  const url = `${ROOT_URL}/user/${userId}/room/${roomId}/gallery`;
  axios.get(url)
    .then((response) => {
      dispatch({ type: FETCH_GALLERY_IMAGES, payload: response.data })
      // console.log(response);
    })
    .catch((err) => {
      console.log(err);
    })
};

export const postGalleryImage = (roomId, userId, image) => dispatch => {
  const url = `${ROOT_URL}/user/${userId}/room/${roomId}/gallery`
  

  axios.post(url, image)
    .then((response) => {
      console.log(`This is the response: ${response}`);
    })
    .catch((err) => {
      console.log(`There was a problem posting that gallery image`, err);
    });
};
