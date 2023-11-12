import { api } from "./api";
import { httpMethods } from "../utils/constants/global";

const getLastThree = () => {
  return fetch(`${api.articles}`, {
    method: httpMethods.GET,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export default {
  getLastThree,
};
