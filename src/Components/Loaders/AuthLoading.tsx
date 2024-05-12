import { CircularProgress } from "@mui/material";

const AuthLoading = () => {
  return (
    <div className="flex justify-center items-center w-[100%] h-[100vh]">
      <CircularProgress size={40} />
    </div>
  );
};

export default AuthLoading;
