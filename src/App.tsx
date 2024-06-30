import "./App.css";
import Body from "./pages/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "cropperjs/dist/cropper.css";

function App() {
  return (
    <div>
      <Provider store={appStore}>
        <Body />
        <ToastContainer />
      </Provider>
    </div>
  );
}

export default App;
