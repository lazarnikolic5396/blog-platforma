import axios from 'axios';

// Kreiramo instancu axios-a sa osnovnim URL-om koji pokazuje na JSON server
const API = axios.create({ baseURL: 'http://localhost:3001' });

/* -------------------- USER API -------------------- */

// Login korisnika -> GET prema /users sa email i password
export const loginUser = (credentials) =>
    API.get(`/users?email=${credentials.email}&password=${credentials.password}`);

// Registracija korisnika -> POST prema /users
export const registerUser = (userData) =>
    API.post('/users', userData);


/* -------------------- POST API -------------------- */

// Dohvati sve postove, sortirane po datumu kreiranja (najnoviji prvi)
export const fetchPosts = () =>
    API.get('/posts?_sort=createdAt&_order=desc');

// Dohvati post po ID
export const fetchPostById = (id) =>
    API.get(`/posts/${id}`);

// Kreiraj novi post
export const createPost = (postData) =>
    API.post('/posts', postData);

// Azuriraj post
export const updatePost = (id, postData) =>
    API.put(`/posts/${id}`, postData);

// Obrisi post
export const deletePost = (id) =>
    API.delete(`/posts/${id}`);


/* -------------------- LOGIN ACTIVITY API -------------------- */

// Sacuvaj novu aktivnost prijave
export const createLoginActivity = (activityData) =>
    API.post('/login_activities', activityData);

// Dohvati aktivnosti prijava, sortirane po vremenu (najnovije prve)
export const fetchLoginActivities = () =>
    API.get('/login_activities?_sort=timestamp&_order=desc');
