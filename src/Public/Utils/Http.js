import Axios from "axios";
import localstorage from "local-storage";

const instance = Axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL,
  headers: {
    authorization: "Bearer " + localstorage.get("token") || ""
  }
});

export default instance;
