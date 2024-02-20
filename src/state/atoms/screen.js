import axios from "axios";
import { atom, selector } from "recoil";
import { PORT } from "./../../../config";

export const activeScreen = atom({
  key: "active-screen",
  default: undefined,
});

export const activeModal = atom({
  key: "active-modal",
  default: "",
});

export const darkmodeState = atom({
  key: "dark-mode",
  default: undefined,
});

export const confirmationState = atom({
  key: "confirmation",
  default: {},
});

export const currentUserState = atom({
  key: "current-user",
  default: selector({
    key: "current-user-selector",
    get: async () => {
      const token = localStorage.getItem("authorization");
      if (token) {
        const response = await axios.get(`${PORT}/seller/`, {
          headers: { Authorization: token },
        });
        console.log(response);
        const user = await response.data.user;
        // return await new Promise((r) => setTimeout(() => r(user), 1000));
        return user;
      }
    },
  }),
});
