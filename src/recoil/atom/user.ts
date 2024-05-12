import { atom } from "recoil";
import { IUserDetails, UserState } from "../../types/user";


export const userState = atom<UserState | null>({
  key: "userState",
  default: null,
});

export const userLoadingState = atom({
  key: "userLoadingState",
  default: true,
});

export const userDetailsLoadingState = atom({
  key: "userDetailsLoadingState",
  default: true,
});

export const userBoardedState = atom({
  key: "userBoardedState",
  default: false,
});

export const userDetailState = atom<IUserDetails>({
  key: "userDetailState",
  default: {
    first_name: "",
    last_name: "",
    address: "",
    gender: "",
    id_proof: "",
    education_details: [
      { education_type: "", name_institution: "", edu_grade: "" },
    ],
    pro_details: [{ company_name: "", designation: "" }],
  },
});
