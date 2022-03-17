import axios from "axios";

// const TUITS_API = "https://fse-sp22-assignment-node.herokuapp.com/api/tuits";
// const USERS_API = "https://fse-sp22-assignment-node.herokuapp.com/api/users";
const TUITS_API = "http://localhost:4000/api/tuits";
const USERS_API = "http://localhost:4000/api/users";

const api = axios.create({
    withCredentials: true
});


export const findAllTuits = () =>
    axios.get(TUITS_API)
        .then(response => response.data);

export const findTuitById = (tid) =>
    axios.get(`${TUITS_API}/${tid}`)
        .then(response => response.data);

export const findTuitsByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/tuits`)
        .then(response => response.data);

export const createTuit = (uid, tuit) =>
    api.post(`${USERS_API}/${uid}/tuits`, tuit)
        .then(response => response.data);

export const updateTuit = (tid, tuit) =>
    axios.post(`${TUITS_API}/${tid}`, tuit)
        .then(response => response.data);

export const deleteTuit = (tid) =>
    axios.delete(`${TUITS_API}/${tid}`)
        .then(response => response.data);

export const deleteTuitsByAuthor = uid =>
    axios.delete(`${USERS_API}/${uid}/tuits`)
        .then(response => response.data);

export const deleteTuitsByContent = tuitContent =>
    axios.delete(`${TUITS_API}/content/${tuitContent}`)
        .then(response => response.data);
