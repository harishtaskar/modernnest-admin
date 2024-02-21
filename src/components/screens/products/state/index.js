import { atom } from "recoil";

export const filterCheckedState = atom({
  key: "filter-checked",
  default: [],
});

export const productDetailState = atom({
  key: "product-details",
  default: {},
});

export const productState = atom({
  key: "products",
  default: [],
});
