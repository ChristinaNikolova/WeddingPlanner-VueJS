import { api } from "./api";
import { requester } from "./requester";
import { httpMethods } from "../utils/constants/global";

const all = () => {
  return requester(`${api.planners}`, httpMethods.GET)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export default {
  all,
};
