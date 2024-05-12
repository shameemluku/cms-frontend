import { useRecoilState } from "recoil";
import {
  userBoardedState,
  userDetailState,
  userDetailsLoadingState,
} from "../recoil/atom/user";
import { fetchUserDetails } from "../api/user";

export default function useDetails() {
  const [, setUserDetails] = useRecoilState(userDetailState);
  const [, setLoading] = useRecoilState(userDetailsLoadingState);
  const [, setBoarded] = useRecoilState(userBoardedState);

  const getUserDetails = async (user_id: string) => {
    try {
      setLoading(true);
      const { data } = await fetchUserDetails(user_id);
      if (data?.data) {
        setBoarded(true);
        setUserDetails(data?.data);
      }
    } catch (error) {}
    setLoading(false);
  };

  const clearUserDetails = () => {
    setUserDetails({
      first_name: "",
      last_name: "",
      address: "",
      gender: "",
      id_proof: "",
      education_details: [
        { education_type: "", name_institution: "", edu_grade: "" },
      ],
      pro_details: [{ company_name: "", designation: "" }],
    });
  };

  return {
    getUserDetails,
    clearUserDetails
  };
}
