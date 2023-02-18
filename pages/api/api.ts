import axios from "axios";
import { getHostName } from "../common/utils";

const defaultHeaders = {
  "Content-Type": "application/json"
}

export function userLogin(params: IUserLogin) {
  return axios.post(`${getHostName}/login`, params, {
    headers: defaultHeaders
  })
  .then((res: any) => res.data)
  .catch((err: any) => err.response.data)
}

export function userRegister(params: IUserRegister) {
  return axios.post(`${getHostName}/register`, params, {
    headers: defaultHeaders
  })
  .then((res: any) => res.data)
  .catch((err: any) => err.response.data)
}

export function getUserByToken(token: string) {
  return axios.get(`${getHostName}/me`, {
    headers: {
      "Authorization": token
    }
  })
  .then((res: any) => res.data)
  .catch((err: any) => err.response.data)
}
