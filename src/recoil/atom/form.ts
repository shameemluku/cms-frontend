import { atom } from "recoil";
import { FormData } from "../../types/form";

export const configState = atom< FormData[]>({
  key: "configState",
  default: [],
});


export const configLoadingState = atom<Boolean>({
    key: "configLoadingState",
    default: false,
  });

  