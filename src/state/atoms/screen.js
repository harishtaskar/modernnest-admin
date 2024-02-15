import axios from "axios";
import { atom, selector } from "recoil";
import { PORT } from "./../../../config";

export const activeScreen = atom({
  key: "active-screen",
  default: "dashboard",
});

export const activeModal = atom({
  key: "active-modal",
  default: "",
});

export const currentUserState = atom({
  key: "current-user",
  default: selector({
    key: "current-user-selector",
    get: async () => {
      const token = localStorage.getItem("authorization");
      const response = await axios.get(`${PORT}/seller/`, {
        headers: { Authorization: token },
      });
      console.log(response);
      const user = await response.data.user;
      // return await new Promise((r) => setTimeout(() => r(user), 2000));
      return user;
    },
  }),
});
