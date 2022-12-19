import axios from "axios";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "https://api.tvmaze.com/";

const instance = axios.create();
export const client = {
  get: async (url) => {
    return instance.get(url);
  },
};
