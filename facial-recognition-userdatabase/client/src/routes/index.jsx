import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// Config.
import { DEFAULT_PATH } from "../config";

// Layouts.
import MainLayout from "../layouts/main";

// Components.
import LoadingScreen from "../components/loading-screen";

// Backend Flask user session.
import { IsSessionValid } from "../functions/isSessionValid";


// ---------------------------------------------------------

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

const Home = Loadable(lazy(() => import("../pages/home")));
const Login = Loadable(lazy(() => import("../pages/login")));
const SignUp = Loadable(lazy(() => import("../pages/sign-up")));

const Page404 = Loadable(lazy(() => import("../pages/page-404")));


// ---------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "home", element: IsSessionValid() ? <Home /> : <Navigate to={"/login"} replace /> },
        { path: "login", element: !IsSessionValid() ? <Login /> : <Navigate to={DEFAULT_PATH} replace /> },
        { path: "sign-up", element: !IsSessionValid() ? <SignUp /> : <Navigate to={DEFAULT_PATH} replace /> },

        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}