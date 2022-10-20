import { UPDATE_INFO } from "./types";
import { CHECK_PROFILE } from "./types";

export const updateInfo =
  (name, email, phone, zip, password) => async (dispatch) => {
    var tmp = {
      truename: name,
      email: email,
      phone: phone,
      zip: zip,
      password: password,
    };

    // api for (name) to get friends
    dispatch({
      type: UPDATE_INFO,
      payload: tmp,
    });
  };

export const checkprofile = (name) => (dispatch) => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((res) => {
      var temp = {};
      for (var i = 0; i < res.length; i++) {
        if (name == res[i]["username"]) {
          temp["email"] = res[i]["email"];
          temp["phone"] = res[i]["phone"];
          temp["zip"] = res[i]["address"]["zipcode"];
          temp["truename"] = res[i]["name"];
          temp["password"] = res[i]["address"]["street"];
          break;
        }
      }

      dispatch({
        type: CHECK_PROFILE,
        payload: temp,
      });
    });
};
