import { atom } from "recoil";

export type UserState = {
  email: string;
  id: string;
  last_logged_in: Date | null;
  name: string;
  role: string;
  username: string;
};

export const userState = atom<UserState | null>({
  key: "userState",
  default: null,
});

export const userLoadingState = atom({
  key: "userLoadingState",
  default: true,
});

interface EducationDetail {
  education_type: string;
  name_insititution: string;
  edu_grade: string;
}

interface ProDetail {
  company_name: string;
  designation: string;
}

export interface FormState {
  first_name: string;
  last_name: string;
  address: string;
  gender: string;
  id_proof: string;
  education_details: EducationDetail[];
  pro_details: ProDetail[];
  [key: string]: any;
}

export const userDetailState = atom<FormState>({
  key: "userDetailState",
  default: {
    first_name: "",
    last_name: "",
    address: "",
    gender: "",
    id_proof: "",
    education_details: [
      { education_type: "", name_insititution: "", edu_grade: "" },
    ],
    pro_details: [{ company_name: "", designation: "" }],
  },
});
