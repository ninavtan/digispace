import axios from "axios";
import { FETCH_ROOMS, FETCH_CURRENT_ROOM, FETCH_GALLERY_IMAGES, POST_GALLERY_IMAGE, FETCH_USER_INFO, FETCH_USER_ROOMS } from "./types";

const ROOT_URL = process.env.REACT_APP_API_ENDPOINT;

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

  axios.post(url, imageToSend)
    .then((response) => {
      console.log(`This is the response: ${response.data}`);
      dispatch({ type: POST_GALLERY_IMAGE, payload: response.data });
    })
    .catch((err) => {
      console.log(`There was a problem posting that gallery image`, err);
    });
};

export const fetchUserInfo = (email) => dispatch => {
  axios.get(`${ROOT_URL}/user/${email}`)
    .then((response) => {
      console.log(`This is the fetch user info response: ${response.data}`);
      dispatch({ type: FETCH_USER_INFO, payload: response.data });
    })
    .catch(err => console.log(`Error with fetchUserInfo: ${err}`));
}

export const fetchUserRooms = (email) => dispatch => {
  axios.get(`${ROOT_URL}/user/${email}/rooms`)
    .then((response) => {
      console.log(response);
      dispatch({ type: FETCH_USER_ROOMS, payload: response.data });
    })
    .catch(err => console.log(err));
}