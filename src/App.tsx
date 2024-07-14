import "cropperjs/dist/cropper.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Body from "./pages/Body";
import { useAppSelector } from "./redux/hooks";
import Loader from "./shared/components/Loader";

const App = () => {
  const showLoader = useAppSelector((state) => state.loader);
  return (
    <div>
      <Body />
      <ToastContainer />
      {showLoader ? <Loader /> : null}
    </div>
  );
};

export default App;
