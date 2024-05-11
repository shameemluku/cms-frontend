import { useEffect } from "react";
import { verifyAuth } from "../api/user";
import { useRecoilState } from "recoil";
import { userLoadingState, userState } from "../recoil/atom/user";

// interface UserData {
//   name: string;
//   email: string;
//   user_id: string;
// }

// interface User {
//   name: string;
//   email: string;
//   user_id: string;
//   token: string | undefined;
// }

export default function useFindUser() {
  
  const [user, setUser] = useRecoilState(userState);
  const [isLoading, setLoading] = useRecoilState(userLoadingState);

  useEffect(() => {
    async function findUser() {
      setLoading(true);
      try {
        let { data } = await verifyAuth();
        setLoading(false);
        setUser({
          ...data?.user,
        });
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            name: data?.data?.name,
            email: data?.data?.email,
            user_id: data?.data?.user_id,
          })
        );
      } catch (err) {
        setLoading(false);
        setUser(null);
        localStorage.removeItem("userInfo");
      }
    }

    findUser();
    console.log("hII");
    
  }, []);

  // useEffect(()=>{
  //     if(user){
  //         localStorage.setItem("userData", JSON.stringify(user));
  //     }else{
  //         localStorage.removeItem("userData");
  //     }
  //   },[user])

  return {
    user,
    setUser,
    isLoading,
  };
}
