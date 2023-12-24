import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  homeRoute,
  registerRoute,
  setsRoute,
  foldersRoute,
  createRoute,
  settingsRoute,
  loginRoute,
  createSetRoute,
} from "./app-utils/AppRoutes";
import { Navigation } from "./app-components/Navigation/Navigation";
import { Provider } from "react-redux";
import { Sets } from "./app-components/Sets/Sets";
import { store } from "./app-context/store";
import { Folders } from "./app-components/Folders/Folders";
import "./index.scss";
import { Create } from "./app-components/Create/Create";
import { Settings } from "./app-components/Settings/Settings";
import { MainPage } from "./app-components/MainPage/MainPage";
import "./index.scss";
import { Registration } from "./app-components/Forms/Registration/Registration";
import { Login } from "./app-components/Forms/Login/Login";
import { CreateSet } from "./app-components/CreateSet/CreateSet";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: homeRoute,
    element: <Navigation />,
    children: [
      {
        path: homeRoute,
        element: <MainPage />,
      },
      {
        path: setsRoute,
        element: <Sets />,
      },
      {
        path: foldersRoute,
        element: <Folders />,
      },
      {
        path: createRoute,
        element: <Create />,
      },
      {
        path: settingsRoute,
        element: <Settings />,
      },
      {
        path: createSetRoute,
        element: <CreateSet />,
      },
    ],
  },
  {
    path: registerRoute,
    element: <Registration />,
  },
  {
    path: loginRoute,
    element: <Login />,
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
