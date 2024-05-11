import { useEffect } from "react";
import BoardingFormUser from "../Components/BoardingUser/BoardingFormUser";
import useConfig from "../hook/useConfig";

const BoardingLayout = () => {
  
  const { generateFlow } = useConfig();
  useEffect(() => {
    generateFlow();
  }, []);
  return (
    <div>
      <BoardingFormUser />
    </div>
  );
};

export default BoardingLayout;
