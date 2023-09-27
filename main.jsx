import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {  Flip } from "react-toastify";

import {

  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import AppLayout from "./Pages/AppLayout";
import Home from "./Pages/Home";
import Sign from "./Pages/Sign";
import Items from "./Pages/Items";
import ItemsDetailsPage from "./Pages/ItemsDetailsPage";
import EditItems from "./Pages/EditItems";
import UpdateItems from "./Pages/UpdateItems";

import ContextP from "./context/ContextP.jsx";
import SignUp from "./Pages/SignUp.jsx";
import  Modal  from "./Pages/Modal.jsx";
import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path:"/",
        element :<Home/>
      },
      {
        path: "sign",
        element: <Sign />,
      },
      {
        path: "items",
        element: <Items />,
      },
      {
        path: "items/:id",
        element: <ItemsDetailsPage />,
      },
      {
        path: "items/edit/:id",
        element: <EditItems />,
      },
      {
        path: "createacc",
        element: <SignUp />,
      },
    ],
  },
]);


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextP>
          <ToastContainer transition={Flip}/>
        <RouterProvider router={router}>
         

          <App />
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: "",
              duration: 5000,
              style: {
                background: "#363636",
                color: "#fff",
              },

              // Default options for specific types
              success: {
                duration: 3000,
                theme: {
                  primary: "green",
                  secondary: "black",
                },
              },
            }}
          />

          <Modal />
          <EditItems />
          <UpdateItems />
        </RouterProvider>
      </ContextP>
    </QueryClientProvider>
  </React.StrictMode>
);
