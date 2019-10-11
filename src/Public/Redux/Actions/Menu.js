import axios from "axios";

export const getMenu = test => {
  console.log("action " + test);
  return {
    type: "GET_MENU",
    payload: new Promise((resolve, reject) => {
      const { search = "", sort = "" } = test;
      axios
        .get(
          `http://localhost:3500/api/v1/product?sort=${sort}&search=${search}`
        )
        .then(result => resolve(result))
        .catch(error => reject(error));
    })
  };
};

// ?limit=3&${page}
