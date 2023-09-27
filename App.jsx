import { ToastContainer } from "react-toastify";
import AppLayout from "./Pages/AppLayout";
  import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <AppLayout />
      <ToastContainer />
    </div>
  );
}

export default App

