import { lazy } from "react";
const Default = lazy(() => import("pages/default"));
const Gallery = lazy(() => import("pages/galleries"));
const Team = lazy(() => import("pages/team"));
const User = lazy(() => import("pages/admin"));
const Vacancy = lazy(() => import("pages/vacancy"));
const Portfolio = lazy(() => import("pages/portfolio"));
const NotFound = lazy(() => import("pages/notFound"));
const LocalizationPanel = lazy(() => import("pages/localizationPanel"));
// const Login = lazy(() => import("pages/login"));

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
    path: "/profile",
    access: ["admin"],
    title: "Profile",
    element: <User />,
  },
  {
    path: "/teams",
    access: ["admin"],
    title: "Jamoa",
    element: <Team />,
  },
  {
    path: "/galleries",
    access: ["admin"],
    title: "Galleries",
    element: <Gallery />,
  },
  {
    path: "/vacancies",
    access: ["admin"],
    title: "Vakansiyalar",
    element: <Vacancy />,
  },
  {
    path: "/portfolio",
    access: ["admin"],
    title: "Portfolio",
    element: <Portfolio />,
  },
  {
    path: "/translations",
    access: ["admin"],
    title: "Translations",
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
