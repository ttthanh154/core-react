// router
import { RouterProvider } from "react-router-dom";
import Router from "./Router";

//Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <RouterProvider router={Router} />
      <ToastContainer
        
      />
    </>
  );
}

export default App;
