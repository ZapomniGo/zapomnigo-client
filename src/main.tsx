import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { App } from "./App";
import "./index.scss";
import { homeRoute, loginRoute, registerRoute } from "./app-utils/AppRoutes";
import { Registration } from "./app-components/Registration/Registration";
import { Login } from "./app-components/Login/Login";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: homeRoute,
    element: <App />,
  },
  {
    path: registerRoute,
    element: <Registration />,
  },
  {
    path: loginRoute,
    element: <Login/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
