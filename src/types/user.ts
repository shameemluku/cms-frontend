export type UserState = {
  email: string;
  _id: string;
  name: string;
  role: string;
  username: string;
};

export interface EducationDetail {
  education_type: string | null;
  name_institution: string | null;
  edu_grade: string | null;
}

export interface ProDetail {
  company_name: string | null;
  designation: string | null;
}

export interface IUserDetails {
  first_name: string;
  last_name: string;
  address: string;
  gender: string;
  id_proof: string;
  education_details: EducationDetail[];
  pro_details: ProDetail[];
  [key: string]: any;
}
