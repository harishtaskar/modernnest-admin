import { atom } from "recoil";

export const activeScreen = atom({
  key: "active-screen",
  default: "profile",
});

export const activeModal = atom({
  key: "active-modal",
  default: "",
});

export const currentUserState = atom({
  key: "current-user",
  default: "123",
});
