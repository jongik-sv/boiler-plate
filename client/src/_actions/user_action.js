import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";
export function loginUser(dataToSubmit) {

  // 서버로 request를 날려서 받은 response에서 data를 가져와서 
  // request에 넣는다.
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);

  // Action은 type, reponse가 필요
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post("/api/users/register", dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  // get 메소드라서 body 부분이 필요없다.
  const request = axios
    .get("/api/users/auth")
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}
