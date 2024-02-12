import { atom } from "recoil";

export const activeRegistrationForm = atom({
  key: "active-form",
  default: {
    name: "personal",
    personaldata: false,
    address: false,
    userdetails: false,
  },
});

export const registrationDataState = atom({
  key: "registration-data",
  default: {},
});
