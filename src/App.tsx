// import BoardingForm from "./Components/Boarding/BoardingForm";
// import { patentItems } from "./Constants/dummy";
// import BoardingLayout from "./Pages/BoardingLayout";
import "./index.css";
import RecoilRootProvider from "./recoil/Provider/RecoilRootProvider";
import AppRouter from "./routes/AppRoute";

const App = (): JSX.Element => {
  return (
    <>
      <RecoilRootProvider>
   
        {/* <BoardingLayout/> */}
        <AppRouter />
      </RecoilRootProvider>
    </>
  );
};

export default App;
