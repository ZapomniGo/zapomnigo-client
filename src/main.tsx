import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
// import { App } from "./App";
import "./index.scss";
import { homeRoute, registerRoute, verifyEmail } from "./app-utils/AppRoutes";
import { Registration } from "./app-components/Registration/Registration";
import { VerifyEmail } from "./app-components/VerifyEmail/VerifyEmail";
import { Navigation } from "./app-components/Navigation/Navigation";
import { Dashboard } from "./app-components/Dashboard/Dashboard";
import { Provider } from "react-redux";
import { store } from "./app-context/store";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: homeRoute,
    element: <Navigation/>
  ,
  children: [
    {
      path: homeRoute,
      element: <Dashboard/>
    },

  ]},
  {
    path: registerRoute,
    element: <Registration />,
  },
  {
    path: verifyEmail,
    element: <VerifyEmail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
  </Provider>
);
