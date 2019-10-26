import axios from "axios";
import { REACT_APP_API_BASEURL } from "dotenv";

export const getMenu = test => {
  console.log("action " + test);
  return {
    type: "GET_MENU",
    payload: new Promise((resolve, reject) => {
      const { search = "", sort = "" } = test;
      axios
        .get(
          `${process.env.REACT_APP_API_BASEURL}/api/v1/product?sort=${sort}&search=${search}`
        )
        .then(result => resolve(result))
        .catch(error => reject(error));
    })
  };
};

// ?limit=3&${page}
