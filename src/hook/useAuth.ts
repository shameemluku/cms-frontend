import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { logout } from "../api/user";
import { userState } from "../recoil/atom/user";

export default function useAuth() {
  const [, setUser] = useRecoilState(userState);

  const logoutUser = async () => {
    try {
      await logout();
      setUser(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      throw error;
    }
  };

  return {
    logoutUser,
  };
}
