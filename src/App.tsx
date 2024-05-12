import { ToastContainer } from "react-toastify";
import "./index.css";
import RecoilRootProvider from "./recoil/Provider/RecoilRootProvider";
import AppRouter from "./routes/AppRoute";
import 'react-toastify/dist/ReactToastify.css';

const App = (): JSX.Element => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RecoilRootProvider>
        {/* <BoardingLayout/> */}
        <AppRouter />
      </RecoilRootProvider>
    </>
  );
};

export default App;
