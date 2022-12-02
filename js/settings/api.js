import {getUserName} from "../utils/storage";

const { name, email } = getUserName();


const API_BASE_URL = "https://api.noroff.dev";
const CREATE_USER_URL = API_BASE_URL + "/api/v1/auction/auth/register";
const LOGIN_USER_URL = API_BASE_URL +  "/api/v1/auction/auth/login";
const CREATE_LISTING_URL = API_BASE_URL +  "/api/v1/auction/listings";
const GET_LISTINGS_BY_ID_URL = API_BASE_URL +  `/api/v1/auction/listings/bids`;
const GET_LISTINGS_BY_SELLERS_URL = API_BASE_URL + `/api/v1/auction/listings/01aab2d2-0448-457b-b409-72274e24c7ed?_seller=true&_bids=true`
const GET_ALL_POSTS_URL = API_BASE_URL +  "/api/v1/auction/listings";


export {
    API_BASE_URL,
    CREATE_USER_URL,
    LOGIN_USER_URL,
    CREATE_LISTING_URL,
    GET_LISTINGS_BY_ID_URL,
    GET_LISTINGS_BY_SELLERS_URL,
    GET_ALL_POSTS_URL
};