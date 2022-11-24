import {getUserName} from "../utils/storage";

const { name, email } = getUserName();


const API_BASE_URL = "https://api.noroff.dev";
const CREATE_USER_URL = API_BASE_URL + "/api/v1/auction/auth/register";
const LOGIN_USER_URL = API_BASE_URL +  "/api/v1/auction/auth/login"


export {
    API_BASE_URL,
    CREATE_USER_URL,
    LOGIN_USER_URL
};