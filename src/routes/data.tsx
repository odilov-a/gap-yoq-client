import { lazy } from "react";
const Default = lazy(() => import("pages/default"));
const News = lazy(() => import("pages/news"));
const Feedback = lazy(() => import("pages/feedbacks"));
const Evolutions = lazy(() => import("pages/evolutions"));
const Galleries = lazy(() => import("pages/galleries"));
const Videos = lazy(() => import("pages/videos"));
const Partners = lazy(() => import("pages/partners"));
const Admin = lazy(() => import("pages/admin"));
const Login = lazy(() => import("pages/login"));
const NotFound = lazy(() => import("pages/notFound"));
const LocalizationPanel = lazy(() => import("pages/localizationPanel"));

export interface IRoute {
  path: string;
  access?: string[] | "*";
  element: JSX.Element;
  inner?: IRoute[];
  index?: boolean;
  title: string;
}

const privateRoutes: IRoute[] = [
  {
    path: "/",
    access: ["admin", "user"],
    title: "Welcome",
    element: <Default />,
  },
  {
    path: "/news",
    access: ["admin"],
    title: "news",
    element: <News />,
  },
  {
    path: "/feedbacks",
    access: ["admin"],
    title: "feedbacks",
    element: <Feedback />,
  },
  {
    path: "/evolutions",
    access: ["admin"],
    title: "evolutions",
    element: <Evolutions />,
  },
  {
    path: "/galleries",
    access: ["admin"],
    title: "galleries",
    element: <Galleries />,
  },
  {
    path: "/videos",
    access: ["admin"],
    title: "videos",
    element: <Videos />,
  },
  {
    path: "/partners",
    access: ["admin"],
    title: "partners",
    element: <Partners />,
  },
  {
    path: "/profile",
    access: ["admin"],
    title: "profile",
    element: <Admin />,
  },
  {
    path: "/translations",
    access: ["admin"],
    title: "",
    element: <LocalizationPanel />,
  },
  {
    path: "*",
    access: ["admin"],
    title: "",
    element: <NotFound />,
  },
];

const publicRoutes: IRoute[] = [
  // {
  //   path: "/login",
  //   access: [],
  //   title: "Login",
  //   element: <Login />,
  // },
];

export { privateRoutes, publicRoutes };
