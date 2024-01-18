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
  setPageRoute,
  verifyEmailRoute,
  verifyEmailTokenRoute,
  privacyPolicyRoute,
  termsOfServiceRoute,
  cookieRulesRoute,
  editSetRoute,
  forgotPasswordRoute,
  forgotPasswordNoTokenRoute,
  studyRoute,
  folderView,
  folderEdit,
  folderCreate,

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
import { SetPage } from "./app-components/SetPage/SetPage";
import VerifyEmail from "./app-components/VerifyEmail/VerifyEmail";
import VerifyEmailToken from "./app-components/VerifyEmail/VerifyEmail";
import { CreateFolder } from "./app-components/CreateFolder/CreateFolder";
import PrivacyPolicy from "./app-components/Legal/PrivacyPolicy";
import TermsOfService from "./app-components/Legal/TermsOfService";
import CookieRules from "./app-components/Legal/CookieRules";
import { EditSet } from "./app-components/EditSet/EditSet";
import ForgotPassword from "./app-components/ForgotPassword/ForgotPassword";
import { StudyComponent } from "./app-components/StudyMode/StudyComponent";

import NotFound from "./app-components/NotFound/NotFound";
import { FolderView } from "./app-components/FolderView/FolderView";
import { EditFolder } from "./app-components/EditFolder/EditFolder";
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
        path: registerRoute,
        element: <Registration />,
      },
      {
        path: loginRoute,
        element: <Login />,
      },
      {
        path: createSetRoute,
        element: <CreateSet />,
      },
      {
        path: setPageRoute,
        element: <SetPage />,
      },
      {
        path: verifyEmailRoute,
        element: <VerifyEmail />,
      },
      {
        path: verifyEmailTokenRoute,
        element: <VerifyEmailToken />,
      },
      {
        path: privacyPolicyRoute,
        element: <PrivacyPolicy />,
      },
      {
        path: termsOfServiceRoute,
        element: <TermsOfService />,
      },
      {
        path: cookieRulesRoute,
        element: <CookieRules />,
      },
      {
        path: editSetRoute,
        element: <EditSet />,
      },
      {
        path: forgotPasswordRoute,
        element: <ForgotPassword />,
      },
      {
        path: forgotPasswordNoTokenRoute,
        element: <ForgotPassword />,
      },
      {
        path: folderCreate,
        element: <CreateFolder />,
      },
      {
        path: folderView,
        element: <FolderView />,
      },
      {
        path: studyRoute,
        element: <StudyComponent />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: folderEdit,
        element: <EditFolder />,
      }
    ],
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
