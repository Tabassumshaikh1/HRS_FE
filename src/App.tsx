import "cropperjs/dist/cropper.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { useAppSelector } from "./redux/hooks";
import { RouterElement } from "./routes/Routes";
import Loader from "./shared/components/Loader";

const App = () => {
  const showLoader = useAppSelector((store) => store.loader);
  return (
    <>
      <RouterElement />
      <ToastContainer />
      {showLoader ? <Loader /> : null}
    </>
  );
};

export default App;
