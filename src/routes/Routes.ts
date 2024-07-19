import { RouteObject, useRoutes } from "react-router-dom";
import { RouteType, UserRoles } from "../data/app.constant";
import { AuthService } from "../services/auth.service";
import AuthenticateRoute from "./AuthenticateRoute";
import LazyLoadRoutes from "./LazyLoadRoutes";

export function RouterElement() {
  const authSvc = new AuthService();

  const routes: RouteObject[] = [
    {
      path: "/",
      element: authSvc.canActivateRoute(RouteType.PUBLIC) ? LazyLoadRoutes("Auth", "Login") : AuthenticateRoute("/dashboard"),
    },
    {
      path: "login",
      element: authSvc.canActivateRoute(RouteType.PUBLIC) ? LazyLoadRoutes("Auth", "Login") : AuthenticateRoute("/dashboard"),
    },
    {
      path: "register",
      element: authSvc.canActivateRoute(RouteType.PUBLIC) ? LazyLoadRoutes("Auth", "Register") : AuthenticateRoute("/dashboard"),
    },
    {
      path: "dashboard",
      element: authSvc.canActivateRoute(RouteType.PRIVATE) ? LazyLoadRoutes("Dashboard", "Dashboard") : AuthenticateRoute("/login"),
    },
    {
      path: "customers",
      element: authSvc.canActivateRoute(RouteType.PRIVATE, [UserRoles.ADMIN])
        ? LazyLoadRoutes("Customer", "CustomerList")
        : AuthenticateRoute("/login"),
    },
  ];

  const routing = useRoutes(routes);

  return routing;
}
