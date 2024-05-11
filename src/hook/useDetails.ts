import { useRecoilState } from "recoil";
import { userDetailState, userDetailsLoadingState } from "../recoil/atom/user";
import { fetchUserDetails } from "../api/user";

export default function useDetails() {
  const [, setUserDetails] = useRecoilState(userDetailState);
  const [, setLoading] = useRecoilState(userDetailsLoadingState);

  const getUserDetails = async (user_id: string) => {
    try {
      setLoading(true);
      const { data } = await fetchUserDetails(user_id);
      setUserDetails(data?.data);
    } catch (error) {}
    setLoading(false);
  };

  return {
    getUserDetails,
  };
}
