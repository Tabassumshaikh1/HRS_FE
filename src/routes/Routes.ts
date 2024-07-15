import { RouteObject, useRoutes } from "react-router-dom";
import LazyLoadRoutes from "./LazyLoadRoutes";

export function RouterElement() {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: LazyLoadRoutes("Auth", "Login"),
    },
    {
      path: "login",
      element: LazyLoadRoutes("Auth", "Login"),
    },
    {
      path: "register",
      element: LazyLoadRoutes("Auth", "Register"),
    },
    {
      path: "dashboard",
      element: LazyLoadRoutes("Dashboard", "Dashboard"),
    },
    {
      path: "customers",
      element: LazyLoadRoutes("Customer", "CustomerList"),
    },
  ];

  return useRoutes(routes);
}
