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
  flipMode,
  landingPage,
  manual,
} from "./app-utils/AppRoutes";
import { Navigation } from "./app-components/Navigation/Navigation";
import { Footer } from "./app-components/Footer/Footer";
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
import HomePage from "./app-components/HomePage/LandingPage";
import NotFound from "./app-components/NotFound/NotFound";
import { FolderView } from "./app-components/FolderView/FolderView";
import Manual from "./app-components/Manual/Manual";
import { EditFolder } from "./app-components/EditFolder/EditFolder";
import FlipMode from "./app-components/FlipMode/FlipMode";
import { useState } from "react";

export const App = () => {
  const [searchValue, setSearchValue] = useState("");

  // Parent component
  const handleSearchValue = (value: string) => {
    if (value === "") {
      console.log("empty");
    } else {
      console.log("here");
    }
    setSearchValue(value);
    window.location.href = "/app";
    localStorage.setItem("searchToken", value);
  };

  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: homeRoute,
      element: <Navigation onSearch={handleSearchValue} />,
      // element: <Navigation/>,

      children: [
        {
          path: homeRoute,
          element: <MainPage searchValue={searchValue} />,
          // element: <MainPage/>,
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
          element: (
            <>
              <Registration />
              <div className="footer-form-fix">
                <Footer prop="form-footer" />
              </div>
            </>
          ),
        },
        {
          path: loginRoute,
          element: (
            <>
              <Login />
              <div className="footer-form-fix">
                <Footer prop="form-footer" />
              </div>
            </>
          ),
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
          element: (
            <>
              <VerifyEmail />
              <div className="footer-form-fix">
                <Footer prop="form-footer" />
              </div>
            </>
          ),
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
          path: flipMode,
          element: <FlipMode />,
        },

        {
          path: folderEdit,
          element: <EditFolder />,
        },
        {
          path: manual,
          element: <Manual />,
        },
      ],
    },
    {
      path: landingPage,
      element: <HomePage />,
    },
  ]);
  return (
    <Provider store={store}>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </React.StrictMode>
    </Provider>
  );
};
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
