import axios from "axios";
import { FETCH_ROOMS, LOGIN_SUCCESS, LOGIN_FAIL, FETCH_CURRENT_ROOM, FETCH_GALLERY_IMAGES, POST_GALLERY_IMAGE } from "./types";

import { authLogin } from "../../services/auth.service";

const ROOT_URL = 'https://calm-basin-65498.herokuapp.com';

export const fetchRooms = () => dispatch => {
  const url = `${ROOT_URL}/rooms`;

  axios.get(url)
  .then((response) => {
    dispatch({ type: FETCH_ROOMS, payload: response.data })
  })
  .catch((err) => {
    console.log(`There was an error with fetching the user's rooms`, err);
  })
};


// export const fetchRooms = (userId) => dispatch => {
//   const url = `${ROOT_URL}/user/${userId}/rooms`;

//   axios.get(url)
//   .then((response) => {
//     dispatch({ type: FETCH_ROOMS, payload: response.data })
//     console.log(response.data);
//   })
//   .catch((err) => {
//     console.log(`There was an error with fetching the user's rooms`, err);
//   })
// };

export const loginUser = (username, password) => dispatch => {
  return authLogin(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: LOGIN_FAIL,
      });
      console.log(error);
      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: message,
      // });
      return Promise.reject();
    }
  );
};

export const fetchCurrentRoom = (roomId) => dispatch => {
  const url = `${ROOT_URL}/room/${roomId}`;

  axios.get(url)
  .then((response) => {
    console.log(response);
    dispatch({ type: FETCH_CURRENT_ROOM, payload: response.data })
  })
  .catch((err) => {
    console.log(`There was an error with fetching the user's current room`, err);
  }, { withCredentials: true })

}

export const fetchGalleryImages = (roomId) => dispatch => {
  const url = `${ROOT_URL}/room/${roomId}/gallery`;
  axios.get(url)
    .then((response) => {
      dispatch({ type: FETCH_GALLERY_IMAGES, payload: response.data })
      // console.log(response);
    })
    .catch((err) => {
      console.log(err);
    })
};

export const postGalleryImage = (roomId, image, guestName) => dispatch => {
  const url = `${ROOT_URL}/room/${roomId}/gallery`
  
  const imageToSend = {room: roomId, image: image, artist: guestName }
  console.log(imageToSend);

  axios.post(url, imageToSend)
    .then((response) => {
      console.log(`This is the response: ${response.data}`);
      dispatch({ type: POST_GALLERY_IMAGE, payload: response.data });
    })
    .catch((err) => {
      console.log(`There was a problem posting that gallery image`, err);
    });
};