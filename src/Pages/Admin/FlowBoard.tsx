import { useEffect } from "react";
import BoardingForm from "../../Components/Boarding/BoardingForm";
import useConfig from "../../hook/useConfig";

const FlowBoard = () => {
  const { generateFlow } = useConfig();
  useEffect(() => {
    generateFlow();
  }, []);

  return (
    <div>
      <BoardingForm />
    </div>
  );
};

export default FlowBoard;
